import React, { useEffect, useState } from "react";
import JWT from "jsonwebtoken";

import update from "lodash.update";

import Checkbox from "components/checkbox";
import Highlighter from "components/highlighter";
import JwtInput from "components/jwtInput";
import TokenValidState from "components/tokenValidState";
import {
  detectSubtokens,
  getAppleTransactionInfo,
  validatePurchase,
} from "utils/appleUtils";

function JwtPage() {
  const [token, setToken] = useState<string>(
    process.env.NEXT_PUBLIC_EXAMPLE_APPLE_PAYLOAD ?? ""
  );
  const [header, setHeader] = useState<JWT.JwtHeader>();
  const [payload, setPayload] = useState<JWT.JwtPayload | string>();
  const [signature, setSignature] = useState<string>();
  const [displayHeader, setDisplayHeader] = useState<boolean>(false);
  const [displayPayload, setDisplayPayload] = useState(true);
  const [displaySignature, setDisplaySignature] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | undefined>();

  useEffect(() => {
    const decoded = JWT.decode(token, {
      complete: true,
    });

    if (decoded) {
      setHeader(decoded.header);
      setPayload(decoded.payload);
      setSignature(decoded.signature);
      setIsValidToken(true);
      const subtokens = detectSubtokens(decoded.payload);

      if (subtokens) {
        subtokens.map((x) => {
          update(decoded.payload as JWT.JwtPayload, x.path, () => x.payload);
        });
      }
    } else {
      setIsValidToken(false);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async (res: AppleTransaction) => {
      let response = await await validatePurchase(res);
      console.log(response);
    };

    if (typeof payload == "object") {
      const res = getAppleTransactionInfo(payload);
      // fetchData(res);
    }
  }, [payload]);

  return (
    <div className="flex flex-col">
      <main className="flex justify-center items-start p-4 h-screen w-full bg-gradient-to-r from-green-100 to-blue-100">
        <div className="bg-white w-full border border-gray-200 divide-y divide-gray-200">
          <details open>
            <summary className="question py-3 px-4 cursor-pointer select-none w-full outline-none">
              JWT token
            </summary>
            <div className="flex flex-col">
              <div className="grid gap-6 md:grid-cols-3 px-10 py-5">
                <Checkbox
                  name="Header"
                  checked={displayHeader}
                  fnChange={(e) => setDisplayHeader(!displayHeader)}
                />
                <Checkbox
                  name="Payload"
                  checked={displayPayload}
                  fnChange={(e) => setDisplayPayload(!displayPayload)}
                />
                <Checkbox
                  name="Signature"
                  checked={displaySignature}
                  fnChange={(e) => setDisplaySignature(!displaySignature)}
                />
              </div>
              <div className="flex px-10">
                <TokenValidState state={isValidToken} />
              </div>
              <div className="flex flex-wrap px-10 py-5">
                <div className="bg-red-50 flex-grow flex-shrink-0 basis-1/2">
                  <JwtInput token={token} onChange={setToken} />
                </div>
                <div className="bg-blue-100 flex-grow flex-shrink-0 basis-1/2 w-[100px] p-2">
                  {displayHeader && (
                    <Highlighter
                      label="Header"
                      payload={JSON.stringify(header, null, 2)}
                    />
                  )}
                  {displayPayload && (
                    <Highlighter
                      label="Payload"
                      payload={JSON.stringify(payload, null, 2)}
                    />
                  )}
                  {displaySignature && (
                    <Highlighter
                      label="Signature"
                      payload={signature ? signature : ""}
                    />
                  )}
                </div>
              </div>
            </div>
          </details>
          <details>
            <summary className="question py-3 px-4 cursor-pointer select-none w-full">
              Validate Purchase
            </summary>
            <p className="pt-1 pb-3 px-4">TODO</p>
          </details>
        </div>
      </main>
    </div>
  );
}

export default JwtPage;
