import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { DESTINATIONS, VISA_DATA } from "./mock-data";

/**
 * Tool: searchDestinations
 */
export const searchDestinations = new FunctionTool({
  name: "search_destinations",
  description:
    "Search travel destinations by region (domestic/international), category, and budget level. Returns matching destinations with highlights.",
  // parameters: z.object({ }),
  // execute: () => ({ }),
});

/**
 * Tool: checkVisaRequirement
 */
export const checkVisaRequirement = new FunctionTool({
  name: "check_visa_requirement",
  description:
    "Check visa requirements for Indonesian passport holders traveling to a specific country. Use this only for international destinations.",
  // parameters: z.object({ }),
  // execute: () => ({ }),
});

// --- Mock data fetchers --- //

/** Simulate fetching destinations. */
async function fetchDestinations(
  region?: string,
  category?: string,
  budget?: string,
) {
  await new Promise((r) => setTimeout(r, Math.random() * 300 + 100));

  let results = DESTINATIONS;
  if (region) results = results.filter((d) => d.region === region);
  if (category) results = results.filter((d) => d.category.includes(category.toLowerCase()));
  if (budget) results = results.filter((d) => d.budget === budget);

  if (results.length === 0) {
    return {
      status: "no_results",
      message: "No destinations match your criteria. Try broadening your search.",
    };
  }

  return {
    status: "success",
    count: results.length,
    destinations: results.map((d) => ({
      name: d.name,
      country: d.country,
      region: d.region,
      budget: d.budget,
      highlights: d.highlights,
      description: d.description,
    })),
  };
}

/** Simulate fetching visa info. */
async function fetchVisaInfo(country: string) {
  await new Promise((r) => setTimeout(r, Math.random() * 200 + 100));

  const key = Object.keys(VISA_DATA).find(
    (k) => k.toLowerCase() === country.toLowerCase(),
  );

  if (!key) {
    return {
      status: "not_found",
      message: `No visa data available for ${country}. Check with the embassy for the latest requirements.`,
    };
  }

  const info = VISA_DATA[key];
  return {
    status: "success",
    country: key,
    visa_required: info?.required,
    notes: info?.notes,
  };
}
