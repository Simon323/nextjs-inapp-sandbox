import React, { useState } from "react";

function JwtPage() {
  const [token, setToken] = useState<string>("");
  return (
    <div className="flex px-10 py-10">
      <div className="flex-grow">
        <textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300"
          placeholder="Your message..."
          rows={5}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-[#AA9901] flex-grow">{token}</div>
    </div>
  );
}

export default JwtPage;
