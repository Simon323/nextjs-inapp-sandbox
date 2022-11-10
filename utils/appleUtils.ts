import JWT from "jsonwebtoken";
import get from "lodash.get";

const appleSubtokenPaths: string[] = [
  "data.signedTransactionInfo",
  "data.signedRenewalInfo",
];

export const detectSubtokens = (payload: JWT.JwtPayload | string) => {
  if (typeof payload == "object") {
    appleSubtokenPaths.map((path) => {
      const token: string = get(payload, path);
      if (token) {
        const decoded = JWT.decode(token, {
          complete: true,
        });

        if (decoded) {
          console.log(decoded.payload);
        }
      }
    });
  }
};
