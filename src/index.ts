import path from "path";
import { NO_OF_HIGHLIGHTS } from "./env";
import { email } from "./mail";
import { highlightsParser, randomHighlightsSlice } from "./highlights";

const run = async () => {
  const clippingsPath = path.join("My Clippings.txt");

  const allHighlights = await highlightsParser(clippingsPath);

  const randomSlice = randomHighlightsSlice(
    allHighlights,
    NO_OF_HIGHLIGHTS >= 0 ? NO_OF_HIGHLIGHTS : 5
  );

  await email(randomSlice);
};

run();
