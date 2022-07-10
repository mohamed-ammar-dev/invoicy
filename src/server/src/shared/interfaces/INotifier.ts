import { sendMail } from "../types/sendMail";

export interface INotifier {
  send(params: sendMail): void;
}
