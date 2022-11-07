import { highlightsParser } from "./utils"

const run = async ()=>{
    await highlightsParser("./src/test/My Clippings.txt");
}

run()