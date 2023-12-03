import JWTUserInfo from "./models/JWTUserInfo";
declare global {
  namespace Express {
    interface Request {
      user?: JWTUserInfo;
    }
  }
}
