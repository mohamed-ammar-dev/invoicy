import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { token } from "../../../../shared/types/tokens";
import {
  JWT_SECRET_KEY,
  TWO_FACTOR_SECRET_KEY,
} from "../../../../config/constants";
import { AppError } from "../../../../error-module/baseError/appError";
import { STATUS_CODE } from "../../../../error-module/types/statusCode";

class AuthHelper {
  generateAccessToken(payload: token) {
    return sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
  }

  verifyAccessToken(token: string) {
    return verify(token, JWT_SECRET_KEY);
  }

  generateTwoFactorToken(userId: number) {
    return sign({ id: userId }, TWO_FACTOR_SECRET_KEY, {
      expiresIn: 60 * 10,
    });
  }

  verifyTwoFactorToken(token: string) {
    return verify(token, TWO_FACTOR_SECRET_KEY);
  }

  generateCode() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async comparePassword(param: any) {
    return await compare(param.password, param.hashedPassword);
  }

  validateCredential(user: any) {
    if (!user)
      throw new AppError(
        "wrong username or password",
        STATUS_CODE.AUTHORIZATION_ERROR
      );
  }

  validateDuplicateRegister(user: any) {
    if (user)
      throw new AppError(
        "this email already exist",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateUser(user: any) {
    if (!user)
      throw new AppError(
        "this email is not registered before",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateMaxLogin(todayUserLogin: number) {
    if (todayUserLogin <= 3)
      throw new AppError(
        "you reached the maximum login",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateMaxForgetPassword(todayForgetPassword: number) {
    if (todayForgetPassword >= 5)
      throw new AppError(
        "you reached the maximum",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateTwoFactorToken(token: string) {
    if (!token)
      throw new AppError(
        "there is missing parameter",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateTwoFactorCode(dbTokenCode: number, inputTokenCode: number) {
    if (dbTokenCode != inputTokenCode)
      throw new AppError(
        "your code is incorrect",
        STATUS_CODE.VALIDATION_ERROR
      );
  }

  validateForgetPasswordCode(codeRecord: any, code: string) {
    if (!codeRecord || codeRecord.code != code)
      throw new AppError(
        "this code is wrong or expired",
        STATUS_CODE.VALIDATION_ERROR
      );

    const expireAt = codeRecord.expireAt;

    if (new Date(expireAt) < new Date())
      throw new AppError(
        "this code is wrong or expired",
        STATUS_CODE.VALIDATION_ERROR
      );
  }
}

export default new AuthHelper();
