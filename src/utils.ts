import { PathLike } from 'fs';
import {readFile} from 'fs/promises'

export const highlightsParser = async (path:PathLike )=>{
    const content = await readFile(path,'utf-8');
    const arr = content.split("==========");
    
    const newarr = arr.map(ele=>{
        const splitAndRemoveEmptyLines =  ele.split('\r\n').filter(f=>f.length>0);
        if (splitAndRemoveEmptyLines.length !=3){
            return null;
        }
        const highlightObj = {
            bookTitle:splitAndRemoveEmptyLines[0],
            content:splitAndRemoveEmptyLines[2],
            details:splitAndRemoveEmptyLines[1]?.slice(2)
        }

        return highlightObj;
    }).filter(Boolean)
    
    console.log({newarr});
}