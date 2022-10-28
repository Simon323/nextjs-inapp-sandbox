import React, { useEffect, useState } from "react";
import JWT from "jsonwebtoken";

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
    <div className="flex flex-wrap px-10 py-10">
      <div className="bg-red-50 flex-grow flex-shrink-0 basis-1/2">
        <textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300"
          placeholder="Your message..."
          rows={5}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-blue-100 flex-grow flex-shrink-0 basis-1/2 w-[100px]">
        <pre className="break-words whitespace-pre-wrap break-normal">
          {JSON.stringify(header, null, 2)}
        </pre>
        <pre className="break-words whitespace-pre-wrap break-normal">
          {JSON.stringify(payload, null, 2)}
        </pre>
        <pre className="break-words whitespace-pre-wrap break-normal">
          <p>{signature}</p>
        </pre>
      </div>
    </div>
  );
}

export default JwtPage;
