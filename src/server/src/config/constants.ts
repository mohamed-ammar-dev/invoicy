import { config } from "dotenv";
import { resolve } from "path";

const environment = process.env.NODE_ENV ?? "development";

if (environment == "development")
  config({ path: resolve(__dirname, "../../../dev.env") });

if (environment == "production") config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const TWO_FACTOR_SECRET_KEY = process.env.TWO_FACTOR_SECRET_KEY!;

export const COOKIE_SECRET = process.env.COOKIE_SECRET!;

export const EMAIL_SENDER_NAME = process.env.EMAIL_SENDER_NAME!;
export const EMAIL_SENDER_FROM = process.env.EMAIL_SENDER_FROM!;
export const EMAIL_API_KEY = process.env.EMAIL_API_KEY!;

export const OPAY_SECRET_KEY = process.env.OPAY_SECRET_KEY!;
export const OPAY_PUBLIC_KEY = process.env.OPAY_PUBLIC_KEY!;
export const OPAY_BASE_URL = process.env.OPAY_BASE_URL!;
export const OPAY_MERCHANT_ID = process.env.OPAY_MERCHANT_ID!;
