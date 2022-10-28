import React, { useEffect, useState } from "react";
import JWT from "jsonwebtoken";

import Checkbox from "components/checkbox";
import Highlighter from "components/highlighter";
import JwtInput from "components/jwtInput";

function JwtPage() {
  const [token, setToken] = useState<string>(
    process.env.NEXT_PUBLIC_EXAMPLE_APPLE_PAYLOAD ?? ""
  );
  const [header, setHeader] = useState<JWT.JwtHeader>();
  const [payload, setPayload] = useState<JWT.JwtPayload | string>();
  const [signature, setSignature] = useState<string>();

  useEffect(() => {
    const decoded = JWT.decode(token, {
      complete: true,
    });

    if (decoded) {
      console.log(decoded);
      setHeader(decoded.header);
      setPayload(decoded.payload);
      setSignature(decoded.signature);
    }
  }, [token]);

  return (
    <div className="flex flex-col">
      <div className="grid gap-6 md:grid-cols-3 px-10 py-10">
        <Checkbox />
      </div>
      <div className="flex flex-wrap px-10 py-10">
        <div className="bg-red-50 flex-grow flex-shrink-0 basis-1/2">
          <JwtInput token={token} onChange={setToken} />
        </div>
        <div className="bg-blue-100 flex-grow flex-shrink-0 basis-1/2 w-[100px] p-2">
          <Highlighter payload={JSON.stringify(header, null, 2)} />
          <Highlighter payload={JSON.stringify(payload, null, 2)} />
          <Highlighter payload={signature ? signature : ""} />
        </div>
      </div>
    </div>
  );
}

export default JwtPage;
