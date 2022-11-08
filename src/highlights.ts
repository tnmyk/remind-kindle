import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { Highlight } from "./types";

const generateHighlightObject = (highlightData: string[]): Highlight => {
  return {
    bookTitle: highlightData[0]!,
    content: highlightData[2]!,
    details: highlightData[1]?.slice(2)!, // removes '- ' from the beginning.
  };
};

export const highlightsParser = async (
  path: PathLike
): Promise<Highlight[]> => {
  const content = await readFile(path, "utf-8");
  const highlightsTexts = content.split("==========");

  const filteredHighlights: Highlight[] = highlightsTexts
    .map((highlightText) => {
      // [bookTitle, details, content]
      const highlightData: string[] = highlightText
        .split("\r\n")
        .join("\n") // To replace all `\r\n` with `\n`. Issue with ubuntu vs win
        .split("\n")
        .filter((f) => f.length > 0);

      if (highlightData.length != 3) {
        return null;
      }

      const highlight: Highlight = generateHighlightObject(highlightData);

      return highlight;
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
