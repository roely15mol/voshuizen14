export interface WasteCollection {
  type: string;
  date: string;
  isToday: boolean;
}

export const wasteColors: Record<string, string> = {
  gft: "text-green-600",
  restafr: "text-gray-500",
  pap: "text-blue-600",
  pmd: "text-orange-500",
  bestafr: "text-purple-500",
};

export const wasteLabels: Record<string, string> = {
  gft: "GFT",
  restafr: "Restafval",
  pap: "Papier",
  pmd: "PMD",
  bestafr: "Best-afval",
};
