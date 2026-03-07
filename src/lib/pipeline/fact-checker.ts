import type { FactClaim, FactCheckResult } from "./types";

const CLAIM_PATTERNS: Array<{
  type: FactClaim["type"];
  regex: RegExp;
}> = [
  {
    type: "price",
    regex: /\$[\d,]+(?:\.\d{2})?|€[\d,]+(?:\.\d{2})?/g,
  },
  {
    type: "percentage",
    regex: /\d+(?:\.\d+)?%/g,
  },
  {
    type: "statistic",
    regex: /\d{1,3}(?:,\d{3})+\s+(?:users|freelancers|clients|projects|businesses)/g,
  },
  {
    type: "date",
    regex: /(?:in|since|by|as of)\s+\d{4}/g,
  },
];

const CONTEXT_WINDOW = 100;

export function extractClaims(content: string): FactClaim[] {
  const claims: FactClaim[] = [];

  for (const { type, regex } of CLAIM_PATTERNS) {
    // Reset regex state before each use
    regex.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;

      const contextStart = Math.max(0, matchStart - CONTEXT_WINDOW);
      const contextEnd = Math.min(content.length, matchEnd + CONTEXT_WINDOW);
      const context = content.slice(contextStart, contextEnd);

      claims.push({
        type,
        value: match[0],
        context,
        verified: false,
      });
    }
  }

  return claims;
}

function normalizeValue(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function verifyClaims(
  claims: FactClaim[],
  scrapedData: string
): FactCheckResult {
  const normalizedScraped = scrapedData.toLowerCase();

  const verifiedClaims: FactClaim[] = [];
  const unverifiedClaims: FactClaim[] = [];

  for (const claim of claims) {
    const normalizedValue = normalizeValue(claim.value);
    const found = normalizedScraped.includes(normalizedValue);

    if (found) {
      verifiedClaims.push({ ...claim, verified: true });
    } else {
      unverifiedClaims.push({ ...claim, verified: false });
    }
  }

  const unverifiedCount = unverifiedClaims.length;
  let riskLevel: FactCheckResult["riskLevel"];

  if (unverifiedCount <= 2) {
    riskLevel = "low";
  } else if (unverifiedCount <= 5) {
    riskLevel = "medium";
  } else {
    riskLevel = "high";
  }

  return {
    totalClaims: claims.length,
    verifiedClaims: verifiedClaims.length,
    unverifiedClaims,
    riskLevel,
  };
}

export function factCheck(
  content: string,
  scrapedData: string
): FactCheckResult {
  const claims = extractClaims(content);
  return verifyClaims(claims, scrapedData);
}
