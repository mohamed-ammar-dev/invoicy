import { MAIL_TEMPLATE } from "../enums/mailTemplates";

export type sendMail = {
  receiver: string;
  templateType: MAIL_TEMPLATE;
  replace: any;
};
