export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "News" | "Tips" | "Fun Facts";
  date: string;
  readTime: string;
  image: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "5-signs-your-tap-water-needs-testing",
    title: "5 Signs Your Tap Water Needs Testing",
    excerpt:
      "Not sure if your water is safe? Here are five warning signs that it might be time to schedule a professional water test for your home.",
    content: `
      <p>Most homeowners assume their tap water is safe because it looks clear. But water quality issues are often invisible to the naked eye, and the contaminants that matter most -- heavy metals, bacteria, volatile organic compounds -- rarely announce themselves with obvious color or odor. Here are five signs that should prompt you to get your water professionally tested.</p>

      <h3>1. Strange Taste or Odor</h3>
      <p>If your water tastes metallic, earthy, or has a chlorine-like bite, something is off. A sulfur or "rotten egg" smell often indicates hydrogen sulfide gas, which is common in North Carolina well water. Metallic flavors can point to elevated levels of iron, manganese, or even lead leaching from older pipes. These are not things you want to ignore.</p>

      <h3>2. Staining on Fixtures and Laundry</h3>
      <p>Reddish-brown stains in your sinks, toilets, or on laundry are classic signs of high iron content. Blue-green staining points to copper corrosion. White, chalky buildup on faucets and showerheads means hard water minerals -- calcium and magnesium -- are present in high concentrations. While not always dangerous, these minerals wreak havoc on your plumbing and appliances over time.</p>

      <h3>3. Unexplained Health Symptoms</h3>
      <p>Frequent stomach issues, skin irritation, or dry and brittle hair after showering can all be linked to water quality. Families with young children or immunocompromised members should be especially vigilant. If multiple people in your household are experiencing similar symptoms, your water supply deserves a closer look.</p>

      <h3>4. Your Home Has Older Pipes</h3>
      <p>Homes built before 1986 may have lead solder in their plumbing joints, and some older homes still have lead service lines. Even if your municipal water supply meets safety standards, the water can pick up contaminants on its way through aging pipes. If your home is more than 30 years old and you have never tested, now is the time.</p>

      <h3>5. You Are on Well Water</h3>
      <p>Unlike city water, well water is not regulated by the EPA. That means no one is testing it for you. The North Carolina Department of Health recommends annual testing for bacteria and nitrates at a minimum. But a comprehensive test -- covering pH, hardness, iron, sulfur, and other contaminants -- gives you the full picture of what you are drinking every day.</p>

      <p>If any of these signs sound familiar, do not wait. Aquafeel Solutions offers free in-home water testing across North Carolina. Our certified technicians will analyze your water on-site and walk you through the results so you can make an informed decision about your family's health.</p>
    `,
    category: "Tips",
    date: "2026-03-10",
    readTime: "5 min read",
    image: "/images/client/photo-05.jpeg",
    author: "Aquafeel Team",
  },
  {
    slug: "truth-about-north-carolina-well-water",
    title: "The Truth About North Carolina Well Water",
    excerpt:
      "More than 2.4 million North Carolinians rely on private wells. Here is what you need to know about the contaminants that commonly affect NC well water.",
    content: `
      <p>North Carolina has one of the highest rates of private well usage in the country. More than 2.4 million residents depend on well water for drinking, cooking, and bathing. Unlike municipal water systems, private wells are not monitored or regulated by the EPA -- which means the responsibility for water quality falls entirely on the homeowner.</p>

      <h3>Common Contaminants in NC Well Water</h3>
      <p>The geological makeup of North Carolina creates a unique set of water quality challenges. The Piedmont and Coastal Plain regions sit on bedrock that naturally releases minerals and metals into groundwater. The most common contaminants found in NC wells include:</p>
      <ul>
        <li><strong>Iron and Manganese</strong> -- These naturally occurring metals cause staining, metallic taste, and can encourage bacterial growth in your plumbing system.</li>
        <li><strong>Hydrogen Sulfide</strong> -- That unmistakable rotten-egg smell. It is caused by sulfur-reducing bacteria thriving in the anaerobic conditions deep underground.</li>
        <li><strong>Coliform Bacteria</strong> -- While not always harmful, the presence of coliform bacteria indicates that your well may be vulnerable to contamination from surface water or septic systems.</li>
        <li><strong>Hardness Minerals</strong> -- Calcium and magnesium deposits that scale up water heaters, reduce soap efficiency, and leave white residue on everything.</li>
        <li><strong>Nitrates</strong> -- Often from agricultural runoff, nitrates are particularly dangerous for infants and pregnant women.</li>
      </ul>

      <h3>Why Annual Testing Matters</h3>
      <p>Well water quality is not static. It changes with the seasons, rainfall patterns, and nearby land use. A well that tested clean five years ago could be compromised today by new construction, agricultural activity, or shifting groundwater patterns. The NC DHHS recommends testing at least annually for bacteria and nitrates, and every few years for a broader panel of contaminants.</p>

      <h3>What You Can Do About It</h3>
      <p>The good news is that virtually every well water issue has a solution. Whole-home filtration systems can remove iron, sulfur, and sediment. Reverse osmosis units provide ultra-pure drinking water at the kitchen tap. UV disinfection kills bacteria without adding chemicals. The key is understanding exactly what is in your water so the right solution can be matched to your specific needs.</p>

      <p>At Aquafeel Solutions, we have been treating North Carolina well water for nearly two decades. We start with a thorough in-home water test, explain exactly what we find, and recommend a system tailored to your water chemistry. No guesswork, no one-size-fits-all -- just clean, safe water customized for your home.</p>
    `,
    category: "News",
    date: "2026-03-03",
    readTime: "6 min read",
    image: "/images/client/photo-04.jpeg",
    author: "Aquafeel Team",
  },
  {
    slug: "how-much-money-save-ditching-bottled-water",
    title: "How Much Money Can You Save by Ditching Bottled Water?",
    excerpt:
      "Americans spend over $35 billion on bottled water every year. Here is a look at the real cost -- and why a home filtration system pays for itself.",
    content: `
      <p>The average American family of four spends between $1,200 and $1,800 per year on bottled water. That is a car payment. A vacation. A year of streaming services ten times over. And the worst part? Most bottled water is just filtered tap water in a plastic container with a markup of 2,000 percent or more.</p>

      <h3>The Numbers Do Not Lie</h3>
      <p>A single gallon of bottled water costs between $1.50 and $3.00 at the grocery store. A gallon of water from a home reverse osmosis system costs roughly two to three cents. Even factoring in the upfront cost of equipment and annual filter replacements, a home filtration system typically pays for itself within the first 12 to 18 months -- and then continues saving you money for years after that.</p>

      <h3>The Environmental Cost</h3>
      <p>Beyond your wallet, there is a staggering environmental price tag. Americans use approximately 50 billion plastic water bottles per year, and only about 30 percent of those get recycled. The rest end up in landfills or the ocean, where they take 450 years to decompose. Manufacturing those bottles also consumes 17 million barrels of oil annually -- enough to fuel 1.3 million cars for a year.</p>

      <h3>What About Water Delivery Services?</h3>
      <p>Five-gallon jug delivery services seem like a greener alternative, and they are to some extent. But the convenience comes at a cost -- typically $30 to $50 per month for a family. That is $360 to $600 per year, plus the hassle of scheduling deliveries, storing bulky jugs, and cleaning a dispenser that can harbor bacteria if not maintained properly.</p>

      <h3>The Smarter Alternative</h3>
      <p>A home filtration system gives you unlimited clean water on demand. No plastic waste. No delivery schedules. No lugging cases from the store. And the water quality? A properly installed reverse osmosis system removes up to 99 percent of contaminants -- far exceeding the purity standards that most bottled water brands meet.</p>

      <p>Aquafeel Solutions makes the switch easy. We install your system, show you how to maintain it, and back everything with our warranty. Most families tell us they wish they had made the switch years earlier -- both for the savings and the convenience of having pure water straight from the tap.</p>
    `,
    category: "Fun Facts",
    date: "2026-02-24",
    readTime: "4 min read",
    image: "/images/client/photo-06.jpeg",
    author: "Aquafeel Team",
  },
  {
    slug: "city-water-vs-well-water-nc-homeowners",
    title: "City Water vs Well Water: What Every NC Homeowner Should Know",
    excerpt:
      "City water and well water come with very different challenges. Here is what North Carolina homeowners need to understand about each -- and how to treat them.",
    content: `
      <p>Whether you are buying a new home, moving to a rural area, or just wondering about your water quality, understanding the difference between city water and well water is essential. Each source has its own set of benefits, risks, and treatment needs -- and what works for one does not necessarily work for the other.</p>

      <h3>City Water: Treated, But Not Perfect</h3>
      <p>Municipal water systems in North Carolina are regulated by the EPA and the state's Department of Environmental Quality. Your city water is treated with chlorine or chloramine to kill bacteria, and it goes through filtration before reaching your tap. So it is safe, right? Technically yes -- but "safe" and "ideal" are two different things.</p>
      <p>The disinfection chemicals themselves can create issues. Chlorine dries out skin and hair, damages rubber seals in appliances, and gives water an unpleasant taste and smell. More concerning, when chlorine reacts with organic matter in the water, it can form trihalomethanes (THMs) and haloacetic acids -- byproducts that have been linked to long-term health concerns. Add in the fact that water travels through miles of aging infrastructure before it reaches your faucet, and there is plenty of opportunity for it to pick up sediment, rust, and trace contaminants along the way.</p>

      <h3>Well Water: Natural, But Unregulated</h3>
      <p>Well water comes straight from underground aquifers, which means no chlorine, no treatment plant, and no monthly water bill. But it also means no oversight. Private well owners in North Carolina are entirely responsible for monitoring and treating their own water supply. The most common well water issues in NC include high iron and manganese levels, hydrogen sulfide odor, bacterial contamination, and elevated hardness.</p>

      <h3>Different Water, Different Solutions</h3>
      <p>This is where many homeowners get confused -- and where a proper water test becomes invaluable. A city water system might need a whole-home carbon filter to remove chlorine and sediment, plus a water softener if hardness is an issue. A well water system might need an iron filter, a sulfur treatment, UV disinfection for bacteria, and a softener -- all configured to work together based on the specific water chemistry of that well.</p>

      <h3>Why a Professional Test Matters</h3>
      <p>Over-the-counter test kits give you a rough idea, but they cannot provide the precision needed to design an effective treatment system. A professional in-home test analyzes multiple parameters simultaneously and gives you exact concentrations -- not just "present" or "not present." That precision is what allows us to recommend the right equipment, sized correctly, with the right media for your specific water.</p>

      <p>Whether you are on city water or well water, Aquafeel Solutions can help. We have been solving water quality problems across North Carolina for nearly two decades, and every solution we recommend starts with understanding exactly what is in your water. Schedule your free test and find out what you are really drinking.</p>
    `,
    category: "Tips",
    date: "2026-02-17",
    readTime: "6 min read",
    image: "/images/client/photo-08.jpeg",
    author: "Aquafeel Team",
  },
  {
    slug: "why-your-water-heater-is-dying",
    title: "Why Your Water Heater Is Dying (And How Filtration Can Save It)",
    excerpt:
      "Hard water silently destroys water heaters, dishwashers, and washing machines. Learn how a filtration system can extend the life of your appliances by years.",
    content: `
      <p>If your water heater is less than ten years old and already showing signs of failure -- inconsistent temperatures, strange noises, reduced hot water capacity -- hard water is likely the culprit. Mineral scale buildup is the number one cause of premature water heater failure, and it is a problem that affects millions of homes across North Carolina.</p>

      <h3>How Hard Water Destroys Appliances</h3>
      <p>When water is heated, dissolved calcium and magnesium come out of solution and form a hard, chalky deposit called scale. In a water heater, this scale accumulates on the heating elements and along the bottom of the tank. Over time, the layer of scale acts as an insulator, forcing the heater to work harder and use more energy to reach the set temperature. A quarter-inch of scale can increase energy consumption by up to 29 percent.</p>

      <h3>It Is Not Just Your Water Heater</h3>
      <p>Scale buildup affects every appliance that uses hot water. Dishwashers develop clogged spray arms and cloudy residue on glassware. Washing machines lose efficiency and leave mineral deposits on clothing. Coffee makers slow down and produce bitter-tasting coffee. Even your showerhead gradually loses pressure as mineral deposits block the tiny nozzle openings.</p>

      <h3>The Cost of Doing Nothing</h3>
      <p>A standard tank water heater costs $800 to $1,500 to replace, plus installation. A tankless unit runs $1,500 to $3,500. When hard water cuts the lifespan of these appliances from 12-15 years down to 6-8 years, you are effectively doubling the cost of ownership. Factor in the higher energy bills from scale-insulated heating elements, and the true cost of hard water can reach thousands of dollars over the life of a home.</p>

      <h3>The Solution: Treat It at the Source</h3>
      <p>A whole-home water filtration system that addresses hardness minerals stops scale before it starts. Modern water softening and conditioning systems remove calcium and magnesium from your water supply before it ever reaches your appliances. The result is longer appliance life, lower energy bills, softer laundry, spot-free dishes, and smoother skin and hair.</p>

      <p>At Aquafeel Solutions, we test your water's hardness level and recommend a treatment system matched to your home's specific needs. Our whole-home systems protect every pipe, fixture, and appliance in your house -- and they typically pay for themselves through energy savings and avoided repairs within just a few years. It is one of the smartest investments a homeowner can make.</p>
    `,
    category: "Tips",
    date: "2026-02-10",
    readTime: "5 min read",
    image: "/images/client/photo-09.jpeg",
    author: "Aquafeel Team",
  },
  {
    slug: "aquafeel-expands-commercial-water-services",
    title:
      "Aquafeel Solutions Expands Commercial Water Services Across North Carolina",
    excerpt:
      "From restaurants to medical facilities, Aquafeel Solutions is now bringing professional water treatment to businesses throughout the Carolinas.",
    content: `
      <p>After nearly two decades of serving residential customers across North Carolina, Aquafeel Solutions is proud to announce the expansion of our commercial water treatment services. Businesses throughout the Triangle, Triad, and Charlotte metro areas can now access the same professional water testing and customized treatment solutions that have made us a trusted name in residential water quality.</p>

      <h3>Why Businesses Need Professional Water Treatment</h3>
      <p>Water quality is not just a residential concern. Restaurants need clean, great-tasting water for food preparation, beverages, and ice. Medical and dental offices require purified water for sterilization and patient care. Office buildings want to provide employees with fresh, filtered drinking water. Manufacturing facilities need consistent water quality for production processes. In every case, the quality of the water directly impacts the quality of the product or service being delivered.</p>

      <h3>Tailored Solutions for Every Industry</h3>
      <p>Commercial water needs differ significantly from residential applications. A restaurant dealing with high-volume water usage requires a different approach than a small dental practice. Our commercial division offers:</p>
      <ul>
        <li><strong>Restaurant and Food Service</strong> -- High-capacity filtration for clean cooking water, crystal-clear ice, and better-tasting beverages that keep customers coming back.</li>
        <li><strong>Healthcare and Dental</strong> -- Ultra-pure water systems meeting stringent regulatory requirements for patient safety and equipment longevity.</li>
        <li><strong>Office and Retail</strong> -- Point-of-use and whole-building filtration that eliminates the need for bottled water delivery services.</li>
        <li><strong>Light Industrial</strong> -- Customized treatment systems designed for process water applications where consistency and purity matter.</li>
      </ul>

      <h3>Same Quality, Larger Scale</h3>
      <p>Our commercial services follow the same philosophy that has guided our residential work: test first, understand the water chemistry, then recommend a solution that is specifically designed for that facility's needs. We do not sell generic systems and hope for the best. Every commercial installation starts with a comprehensive water analysis and ends with a system engineered for the exact demands of that business.</p>

      <p>If your business relies on water quality -- and virtually every business does -- we would love to show you what professional treatment can do. Contact our commercial division for a free on-site water assessment and discover how clean water can improve your operations, reduce equipment maintenance costs, and deliver a better experience to your customers and employees.</p>
    `,
    category: "News",
    date: "2026-03-06",
    readTime: "5 min read",
    image: "/images/client/photo-07.png",
    author: "Aquafeel Team",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);

  const sameCategoryPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentSlug && post.category === currentPost.category
  );

  const otherPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentSlug && post.category !== currentPost.category
  );

  return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
}
