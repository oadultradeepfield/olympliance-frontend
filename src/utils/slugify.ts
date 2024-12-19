export const slugify = (title: string, wordLimit: number = 5) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .slice(0, wordLimit)
    .join("-");
};
