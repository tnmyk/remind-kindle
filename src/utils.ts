import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { Highlight } from "./types";
import nodemailer from "nodemailer";

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

export const email = async (highlights: Highlight[]) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env["SENDER_EMAIL"], // generated ethereal user
      pass: process.env["SENDER_APP_PASSWORD"], // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: process.env["RECEIVING_EMAIL"], // list of receivers
    subject: "📔🔖 Kindle Highlights", // Subject line
    // text: "Hello world", // plain text body
    html: generateHTML(highlights), // html body
  });
};

const generateHTML = (highlights: Highlight[]) => {
  const highlightsHTML = highlights
    .map((high) => {
      return `<tr>
      <td style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
          <tbody>
            <tr>
              <td align="left" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;">
                <div style="font-family:lucida Grande,Verdana,Microsoft YaHei;font-size:18px;line-height:1.7;text-align:left;color:grey;">${high.bookTitle}</div>
              </td>
            </tr>
            <tr>
              <td align="left" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;">
                <div style="font-family:lucida Grande,Verdana,Microsoft YaHei;font-size:14px;line-height:1.7;text-align:left;color:grey;">${high.content}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>`;
    })
    .join(" ");

  return `<body style="word-spacing:normal;background-color:#E1E8ED;">
  <div style="background-color:#E1E8ED;">
    <div style="background:white;background-color:white;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:white;background-color:white;width:100%;">
        <tbody>
          <tr>
            <td style="border:none;direction:ltr;font-size:0px;padding:20px 0px 0px 0px;text-align:center;">
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:50px;">
                                        <img height="auto" src="https://avatars0.githubusercontent.com/u/16115896?v=3&amp;s=200" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 0px 0px 0px;word-break:break-word;">
                                <p style="border-top:solid 1px #f8f8f8;font-size:1px;margin:0px auto;width:100%;">
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div style="background:#fcfcfc;background-color:#fcfcfc;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fcfcfc;background-color:#fcfcfc;width:100%;">
        <tbody>
          <tr>
            <td style="border:none;direction:ltr;font-size:0px;padding:20px 0px 0px 0px;text-align:center;">
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;">
                                <div style="font-family:Helvetica Neue;font-size:20px;font-weight:200;line-height:1.7;text-align:center;color:grey;">Your favorite Kindle Highlights</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 0px 0px 0px;word-break:break-word;">
                                <p style="border-top:solid 1px #f8f8f8;font-size:1px;margin:0px auto;width:100%;">
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div style="background:white;background-color:white;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:white;background-color:white;width:100%;">
        <tbody>
          <tr>
            <td style="border:none;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
              <div class="mj-column-px-350 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                  ${highlightsHTML}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
`;
};
