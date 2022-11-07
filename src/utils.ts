import { PathLike } from 'fs';
import {readFile} from 'fs/promises'

export const highlightsParser = async (path:PathLike )=>{
    const content = await readFile(path,'utf-8');
    console.log({content});
}