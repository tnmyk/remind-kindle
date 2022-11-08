import nodemailer from "nodemailer";
import { RECEIVING_EMAIL, SENDER_APP_PASSWORD, SENDER_EMAIL } from "./env";
import { Highlight } from "./types";

export const email = async (highlights: Highlight[]) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL, // Gmail email from which highlights will be sent
      pass: SENDER_APP_PASSWORD, // generated app password
    },
  });

  await transporter.sendMail({
    to: RECEIVING_EMAIL, // Receiving email
    subject: "📔🔖 Kindle Highlights", // Subject line
    html: generateHTML(highlights), // html body
  });
};

// Generates HTML for the email.
const generateHTML = (highlights: Highlight[]) => {
  const highlightsSectionHTML = highlights
    .map((high) => {
      return `<tr>
        <td style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
            <tbody>
              <tr>
                <td align="left" style="font-size:0px;padding:10px 25px 5px 25px;word-break:break-word;">
                  <div style="font-family:lucida Grande,Verdana,Microsoft YaHei;font-size:18px;line-height:1.7;text-align:left;color:#5e5e5e;">${high.bookTitle}</div>
                </td>
              </tr>
              <tr>
                <td align="left" style="font-size:0px;padding:0px 25px 15px 25px;word-break:break-word;">
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
                                          <img height="auto" src="https://raw.githubusercontent.com/tnmyk/remind-kindle/main/logo.png" alt="Logo" title="Logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50">
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
                                  <div style="font-family:Helvetica Neue;font-size:20px;font-weight:300;line-height:1.7;text-align:center;color:grey;">Your favorite Kindle Highlights</div>
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
                    ${highlightsSectionHTML}
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
              <td style="border:none;direction:ltr;font-size:0px;padding:0px 0px 10px 0px;text-align:center;">
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 0px 10px 0px;word-break:break-word;">
                                    <p style="border-top:solid 1px #C9CCCF;font-size:1px;margin:0px auto;width:100%;">
                                    </p>
                              </td></tr></table><![endif]-->
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
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:5px 25px 5px 25px;word-break:break-word;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                      <tbody>
                                        <tr>
                                          <td style="padding:4px 4px 4px 4px;vertical-align:middle;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px;">
                                              <tbody>
                                                <tr>
                                                  <td style="padding:0px;font-size:0;height:20px;vertical-align:middle;width:20px;">
                                                    <a href="https://github.com/tnmyk/remind-kindle" target="_blank">
                                                      <img height="20" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" style="border-radius:3px;display:block;" width="20" />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td style="vertical-align:middle;padding:4px 4px 4px 0px;">
                                            <a href="https://github.com/tnmyk/remind-kindle" style="color:#333333;font-size:13px;font-weight:normal;font-family:lucida Grande,Verdana,Microsoft YaHei;line-height:22px;text-decoration:none;" target="_blank"> Github </a>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  `;
};
