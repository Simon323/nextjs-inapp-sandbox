import JWT from "jsonwebtoken";
import get from "lodash.get";

const appleSubtokenPaths: string[] = [
  "data.signedTransactionInfo",
  "data.signedRenewalInfo",
];

export const detectSubtokens = (
  payload: JWT.JwtPayload | string
): JWT.JwtPayload[] => {
  const result: JWT.JwtPayload[] = [];
  if (typeof payload == "object") {
    appleSubtokenPaths.map((path) => {
      const token: string = get(payload, path);
      if (token) {
        const decoded = JWT.decode(token, {
          complete: true,
        });

        if (decoded) {
          console.log(decoded.payload);
          result.push(decoded.payload as JWT.JwtPayload);
        }
      }
    });
  }

  return result;
};
