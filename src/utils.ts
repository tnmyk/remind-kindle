import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { Highlight } from "./types";
import nodemailer from 'nodemailer';

export const highlightsParser = async (
  path: PathLike
): Promise<Highlight[]> => {
  const content = await readFile(path, "utf-8");
  const arr = content.split("==========");

  const filteredHighlights: Highlight[] = arr
    .map((ele) => {
      const splitAndRemoveEmptyLines = ele
        .split("\r\n")
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

export const randomHighlightsSlice = (highlights: object[], amount: number) => {
  let slice = highlights
    .sort(() => 0.5 - Math.random())
    .slice(Math.min(amount, highlights.length));

  return slice;
};

export const email= async ()=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user:process.env['SENDER_EMAIL'], // generated ethereal user
          pass: process.env['SENDER_APP_PASSWORD'], // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        // from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: process.env['RECEIVING_EMAIL'], // list of receivers
        subject: "📔🔖 Kindle Highlights", // Subject line
        // text: "Hello world", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
}