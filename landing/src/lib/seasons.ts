import fs from "fs";
import path from "path";

interface SeasonData {
  months: number[];
  heroPhoto: string;
  accent: string;
  accentLight: string;
  tip: string;
  greeting: string;
}

type SeasonKey = string;

export function getCurrentSeason(): { key: SeasonKey; data: SeasonData } {
  const seasonsPath = path.join(process.cwd(), "src/data/seasons.json");
  const overridePath = path.join(process.cwd(), "src/data/season-override.json");

  const seasons: Record<SeasonKey, SeasonData> = JSON.parse(
    fs.readFileSync(seasonsPath, "utf-8")
  );

  // Check for manual override
  try {
    const override = JSON.parse(fs.readFileSync(overridePath, "utf-8"));
    if (override.override && seasons[override.override]) {
      return { key: override.override, data: seasons[override.override] };
    }
  } catch {
    // No override file or invalid — fall through to auto-detection
  }

  // Auto-detect season by current month
  const month = new Date().getMonth() + 1; // 1-12
  for (const [key, data] of Object.entries(seasons)) {
    if (data.months.includes(month)) {
      return { key, data };
    }
  }

  // Fallback to lente
  return { key: "lente", data: seasons.lente };
}
