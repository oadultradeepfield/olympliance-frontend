import { ThreadData } from "../data/threadData";

export const filterThreads = (threads: ThreadData[], searchTerm: string) => {
  if (!searchTerm) return threads;

  const searchWords = searchTerm
    .split(" ")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0);

  return threads.filter((thread) => {
    return searchWords.every((word) => {
      return (
        thread.title.toLowerCase().includes(word) ||
        thread.content.toLowerCase().includes(word) ||
        thread.tags.some((tag) => tag.toLowerCase().includes(word))
      );
    });
  });
};
