import { NextRequest, NextResponse } from "next/server";
import ewgData from "@/data/ewg-database.json";

export const dynamic = "force-dynamic";

const { systems, zipToPws } = ewgData as {
  systems: Record<
    string,
    {
      utilityName: string;
      location: string;
      populationServed: string;
      contaminantsExceed: number;
      totalContaminants: number;
      contaminants: {
        name: string;
        effect: string;
        utilityLevel: string;
        legalLimit: string;
        ewgGuideline: string;
        timesAbove: string;
        sources: string[];
        filters: string[];
      }[];
      ewgUrl: string;
    }
  >;
  zipToPws: Record<string, string>;
};

// All known zips for nearby matching
const knownZipList = Object.keys(zipToPws);

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get("zip");

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Valid 5-digit zip code required" },
      { status: 400 }
    );
  }

  // Direct match
  let pwsCode = zipToPws[zip];

  // If no direct match, try to find nearest zip with same 3-digit prefix
  if (!pwsCode) {
    const prefix = zip.slice(0, 3);
    const match = knownZipList.find((z) => z.startsWith(prefix));
    if (match) {
      pwsCode = zipToPws[match];
    }
  }

  if (!pwsCode || !systems[pwsCode]) {
    return NextResponse.json(
      {
        error:
          "No water data found for this zip code. We currently cover North Carolina and South Carolina areas.",
      },
      { status: 404 }
    );
  }

  const result = systems[pwsCode];

  return NextResponse.json(result, {
    headers: {
      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
