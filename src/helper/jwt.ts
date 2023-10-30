import jwt_decode from "jwt-decode";

export const decodeJWT = (token: string) => jwt_decode(token);
