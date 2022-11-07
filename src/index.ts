import { highlightsParser, randomHighlightsSlice } from "./utils";

const run = async () => {
  const allHighlights = await highlightsParser("./src/test/My Clippings.txt");
  const randomSlice = randomHighlightsSlice(allHighlights, 1);
  
};

run();
