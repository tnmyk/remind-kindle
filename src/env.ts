import { config } from "dotenv";

config();

export const NO_OF_HIGHLIGHTS = Number(process.env["NO_OF_HIGHLIGHTS"]);

export const SENDER_EMAIL = process.env["SENDER_EMAIL"];

export const SENDER_APP_PASSWORD = process.env["SENDER_APP_PASSWORD"];

export const RECEIVING_EMAIL = process.env["RECEIVING_EMAIL"];
