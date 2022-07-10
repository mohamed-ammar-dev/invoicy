import { transporter } from "../../3rd-party-module/mail";
import { MAIL_TEMPLATE } from "../enums/mailTemplates";
import { sendMail } from "../types/sendMail";
import { twoFactorLoginTemplate } from "./templates/twoFactorLogin";
import { EMAIL_SENDER_FROM, EMAIL_SENDER_NAME } from "../../config/constants";
import { INotifier } from "../interfaces/INotifier";
import { injectable } from "inversify";
import "reflect-metadata";
import { forgetPasswordTemplate } from "./templates/forgetPassword";
const SibApiV3Sdk = require("sib-api-v3-sdk");

@injectable()
export class MailService implements INotifier {
  async send(params: sendMail) {
    const template = this.getMailTemplate(params.templateType, params.replace);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = params.templateType;
    sendSmtpEmail.htmlContent = template;
    sendSmtpEmail.sender = {
      name: EMAIL_SENDER_NAME,
      email: EMAIL_SENDER_FROM,
    };
    sendSmtpEmail.to = [{ email: params.receiver }];

    transporter.sendTransacEmail(sendSmtpEmail);
  }

  private getMailTemplate(templateType: MAIL_TEMPLATE, replace: any) {
    switch (templateType) {
      case MAIL_TEMPLATE.TWO_FACTOR_LOGIN:
        return twoFactorLoginTemplate(replace);

      case MAIL_TEMPLATE.FORGET_PASSWORD:
        return forgetPasswordTemplate(replace);
    }
  }
}
