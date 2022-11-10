import JWT from "jsonwebtoken";
import get from "lodash.get";

const appleSubtokenPaths: { name: string; path: string }[] = [
  {
    path: "data.signedTransactionInfo",
    name: "signedTransactionInfo",
  },
  {
    path: "data.signedRenewalInfo",
    name: "signedRenewalInfo",
  },
];

interface DetectSubtokensResult {
  name: string;
  path: string;
  payload: JWT.JwtPayload;
}

export const detectSubtokens = (
  payload: JWT.JwtPayload | string
): DetectSubtokensResult[] => {
  const result: DetectSubtokensResult[] = [];
  if (typeof payload == "object") {
    appleSubtokenPaths.map(({ path, name }) => {
      const token: string = get(payload, path);
      if (token) {
        const decoded = JWT.decode(token, {
          complete: true,
        });

        if (decoded) {
          result.push({
            payload: decoded.payload as JWT.JwtPayload,
            name,
            path,
          });
        }
      }
    });
  }

  return result;
};
