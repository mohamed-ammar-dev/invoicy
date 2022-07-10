import { EMAIL_API_KEY } from "../config/constants";

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = EMAIL_API_KEY;

export const transporter = new SibApiV3Sdk.TransactionalEmailsApi();
