import { email, highlightsParser, randomHighlightsSlice } from "./utils";
import { config } from "dotenv";
import path from 'path'
config();

const run = async () => {
  const clippingsPath  = path.join("src", "test","My Clippings.txt");
  const allHighlights = await highlightsParser(clippingsPath);
  const randomSlice = randomHighlightsSlice(allHighlights, 2);

  await email(randomSlice);
};

run();
