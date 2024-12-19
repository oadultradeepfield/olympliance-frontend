export interface Category {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

export const categories: Category[] = [
  { id: 1, emoji: "📚", title: "General", description: "Random Questions" },
  {
    id: 2,
    emoji: "🧮",
    title: "Mathematics",
    description: "Preparing for IMO",
  },
  { id: 3, emoji: "⚛️", title: "Physics", description: "Preparing for IPhO" },
  { id: 4, emoji: "🧪", title: "Chemistry", description: "Preparing for IChO" },
  {
    id: 5,
    emoji: "💻",
    title: "Informatics",
    description: "Preparing for IOI",
  },
  { id: 6, emoji: "🔬", title: "Biology", description: "Preparing for IBO" },
  { id: 7, emoji: "🤯", title: "Philosophy", description: "Preparing for IPO" },
  { id: 8, emoji: "🪐", title: "Astronomy", description: "Preparing for IOAA" },
  { id: 9, emoji: "🌏", title: "Geography", description: "Preparing for iGeo" },
  {
    id: 10,
    emoji: "💬",
    title: "Linguistics",
    description: "Preparing for IOL",
  },
  {
    id: 11,
    emoji: "🗿",
    title: "Earth Science",
    description: "Preparing for IESO",
  },
];
