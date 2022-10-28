import React from "react";

interface Props {
  token: string;
  onChange: any;
}

function JwtInput({ token, onChange }: Props) {
  return (
    <textarea
      id="message"
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300"
      placeholder="Your message..."
      rows={10}
      value={token}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
}

export default JwtInput;
