import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { Highlight } from "./types";

export const highlightsParser = async (
  path: PathLike
): Promise<Highlight[]> => {
  const content = await readFile(path, "utf-8");
  const arr = content.split("==========");

  const filteredHighlights: Highlight[] = arr
    .map((ele) => {
      const splitAndRemoveEmptyLines = ele
        .split("\r\n")
        .join("\n")
        .split("\n")
        .filter((f) => f.length > 0);

      if (splitAndRemoveEmptyLines.length != 3) {
        return null;
      }

      const highlightObj = {
        bookTitle: splitAndRemoveEmptyLines[0]!,
        content: splitAndRemoveEmptyLines[2]!,
        details: splitAndRemoveEmptyLines[1]?.slice(2)!,
      };

      return highlightObj;
    })
    .filter(Boolean) as Highlight[];

  return filteredHighlights;
};

export const randomHighlightsSlice = (
  highlights: Highlight[],
  amount: number
): Highlight[] => {
  let slice = highlights
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(amount, highlights.length));

  return slice;
};

