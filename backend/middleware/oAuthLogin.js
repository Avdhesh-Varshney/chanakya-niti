//file created by : Edasgh
import {google} from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const googleLogin= new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);

//construct twitter oauth url
export const getURLWithQueryParams = (
  baseUrl,
  params,
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${baseUrl}?${query}`;
};
