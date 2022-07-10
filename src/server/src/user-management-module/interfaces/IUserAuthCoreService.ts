export interface IUserAuthCoreService {
  register(params: { email: string }): any;
  login(params: { email: string; password: string }): any;
  sendForgetPasswordCode(params: { email: string; code: string }): any;
  validateForgetPasswordCode(params: { email: string; code: string }): any;
  resetPassword(params: {
    email: string;
    code: string;
    newPassword: string;
  }): any;
  resetCounters(): any;
}
