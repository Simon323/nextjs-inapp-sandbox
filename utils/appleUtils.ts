import JWT from "jsonwebtoken";
import get from "lodash.get";
import { v4 as uuidv4 } from "uuid";
import { decode } from "js-base64";
import axios from "axios";

interface DetectSubtokensResult {
  name: string;
  path: string;
  payload: JWT.JwtPayload;
}

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

export const validatePurchase = async ({
  originalTransactionId,
  environment,
  bundleId,
}: AppleTransaction) => {
  let storekitUrl = "";
  const iat = Math.floor(new Date().getTime() / 1000) - 10;
  const exp = iat + 310;
  const nonce = uuidv4();
  const payload = {
    iss: process.env.NEXT_PUBLIC_APPLE_ISSUER_ID,
    iat,
    exp,
    nonce,
    aud: "appstoreconnect-v1",
    bid: bundleId,
  };

  if (environment === "Sandbox") {
    storekitUrl = process.env.NEXT_PUBLIC_APPLE_STOREKIT_SANDBOX!;
  } else {
    storekitUrl = process.env.NEXT_PUBLIC_APPLE_STOREKIT_PRODUCTION!;
  }

  const token = JWT.sign(
    payload,
    decode(process.env.NEXT_PUBLIC_APPLE_IN_APP_PURCHASE_KEY_ENCODED!),
    {
      algorithm: "ES256",
      keyid: process.env.NEXT_PUBLIC_APPLE_KEY_ID,
    }
  );

  const response = await axios.get(`${storekitUrl}/${originalTransactionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response.data;

  for (let item of data) {
    if (item.lastTransactions) {
      for (let lastTransaction of item.lastTransactions) {
        if (
          lastTransaction.originalTransactionId ===
          originalTransactionId.toString()
        ) {
          return {
            transactionInfo: JWT.decode(lastTransaction.signedTransactionInfo),
            renewalInfo: JWT.decode(lastTransaction.signedRenewalInfo),
          };
        }
      }
    }
  }
};

export const getAppleTransactionInfo = (payload: any): AppleTransaction => {
  const originalTransactionId = get(
    payload,
    "data.signedTransactionInfo.originalTransactionId"
  );
  const environment = get(payload, "data.environment");
  const bundleId = get(payload, "data.bundleId");

  return {
    bundleId,
    environment,
    originalTransactionId,
  };
};
