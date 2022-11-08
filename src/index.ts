import { email, highlightsParser, randomHighlightsSlice } from "./utils";
import path from "path";
import { NO_OF_HIGHLIGHTS } from "./env";

const run = async () => {
  const clippingsPath = path.join("src", "test", "My Clippings.txt");
  const allHighlights = await highlightsParser(clippingsPath);
  const randomSlice = randomHighlightsSlice(allHighlights, NO_OF_HIGHLIGHTS);

  await email(randomSlice);
};

run();
