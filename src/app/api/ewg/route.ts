import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

interface Contaminant {
  name: string;
  effect: string;
  utilityLevel: string;
  legalLimit: string;
  ewgGuideline: string;
  timesAbove: string;
  sources: string[];
  filters: string[];
}

interface EWGResult {
  utilityName: string;
  location: string;
  populationServed: string;
  contaminantsExceed: number;
  totalContaminants: number;
  contaminants: Contaminant[];
  ewgUrl: string;
}

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get("zip");

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Valid 5-digit zip code required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Search by zip to find the largest utility (most relevant)
    const controller1 = new AbortController();
    const timeout1 = setTimeout(() => controller1.abort(), 10000);
    const searchRes = await fetch(
      `https://www.ewg.org/tapwater/search-results.php?zip5=${zip}&searchtype=zip`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller1.signal,
      }
    );
    clearTimeout(timeout1);

    if (!searchRes.ok) {
      return NextResponse.json(
        { error: "Failed to reach EWG database. Please try again." },
        { status: 502 }
      );
    }

    const searchHtml = await searchRes.text();
    const $search = cheerio.load(searchHtml);

    // Check if EWG says the zip is invalid (returns 50 largest systems nationally)
    const subText = $search(".utilities-sub-text").text().toLowerCase();
    if (subText.includes("invalid zip") || subText.includes("invalid zipcode")) {
      return NextResponse.json(
        { error: "No water data found for this zip code. Try a nearby zip code." },
        { status: 404 }
      );
    }

    // Get the featured utility first (usually the largest/primary one)
    let pwsCode = "";
    const featuredLink = $search('a.featured-utility-link[href*="system.php?pws="]')
      .first()
      .attr("href");

    if (featuredLink) {
      const params = new URLSearchParams(featuredLink.split("?")[1]);
      pwsCode = params.get("pws") || "";
    }

    // Fallback: find utility from table, preferring local results
    if (!pwsCode) {
      let maxPop = 0;
      $search('a[href*="system.php?pws="]').each((_, el) => {
        const href = $search(el).attr("href") || "";
        const row = $search(el).closest("tr");
        const popText = row.find("td").last().text().replace(/[^0-9]/g, "");
        const pop = parseInt(popText) || 0;
        if (pop > maxPop) {
          maxPop = pop;
          const params = new URLSearchParams(href.split("?")[1]);
          pwsCode = params.get("pws") || "";
        }
      });
    }

    if (!pwsCode) {
      return NextResponse.json(
        { error: "No water utilities found for this zip code" },
        { status: 404 }
      );
    }

    // Step 2: Fetch the utility's contaminant report
    const controller2 = new AbortController();
    const timeout2 = setTimeout(() => controller2.abort(), 10000);
    const systemRes = await fetch(
      `https://www.ewg.org/tapwater/system.php?pws=${pwsCode}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller2.signal,
      }
    );
    clearTimeout(timeout2);

    if (!systemRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch utility data" },
        { status: 502 }
      );
    }

    const systemHtml = await systemRes.text();
    const $ = cheerio.load(systemHtml);

    // Parse utility info
    const utilityName =
      $(".system-name-info h1").first().text().trim() ||
      $("h1").first().text().trim() ||
      "Unknown Utility";

    // Parse location and population from system-name-info
    const infoText = $(".system-name-info").text();
    const locationMatch = infoText.match(
      /(?:Serving|Location)[:\s]*([A-Za-z\s]+,\s*[A-Z]{2})/i
    );
    const popMatch = infoText.match(/(?:Serves|Population)[:\s]*([\d,]+)/i);

    const location = locationMatch ? locationMatch[1].trim() : "";
    const populationServed = popMatch ? popMatch[1].trim() : "";

    // Parse contaminant counts
    const exceedText = $("p:contains('Contaminants Exceed')").prev("h2").text().trim();
    const totalText = $("p:contains('Total Contaminants')").text().trim();
    const contaminantsExceed = parseInt(exceedText) || 0;
    const totalMatch = totalText.match(/(\d+)\s*Total/);
    const totalContaminants = totalMatch ? parseInt(totalMatch[1]) : 0;

    // Parse individual contaminants (above guidelines)
    const contaminants: Contaminant[] = [];

    $("#contams_above_hbl .contaminant-grid-item").each((_, el) => {
      const item = $(el);
      const name = item.find("h3").first().text().trim();
      const effect = item
        .find(".potentital-effect")
        .text()
        .replace("Potential Effect:", "")
        .trim();
      const utilityLevel = item
        .find(".this-utility-text")
        .text()
        .replace("This Utility:", "")
        .trim();
      const legalLimit = item
        .find(".legal-limit-text")
        .text()
        .replace("Legal Limit:", "")
        .trim();
      const ewgGuideline = item
        .find(".health-guideline-text")
        .text()
        .replace("EWG's Health Guideline:", "")
        .trim();
      const timesAbove = item.find(".detect-times-greater-than").text().trim();

      const sources: string[] = [];
      item
        .find(
          ".pollution-filtering-wrapper > div:first-child .pollution-source-wrapper p"
        )
        .each((_, s) => {
          sources.push($(s).text().trim());
        });

      const filters: string[] = [];
      item
        .find(
          ".pollution-filtering-wrapper > div:last-child .pollution-source-wrapper p"
        )
        .each((_, f) => {
          filters.push($(f).text().trim());
        });

      if (name) {
        contaminants.push({
          name,
          effect,
          utilityLevel,
          legalLimit,
          ewgGuideline,
          timesAbove,
          sources,
          filters,
        });
      }
    });

    const result: EWGResult = {
      utilityName,
      location,
      populationServed,
      contaminantsExceed,
      totalContaminants,
      contaminants,
      ewgUrl: `https://www.ewg.org/tapwater/system.php?pws=${pwsCode}`,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
