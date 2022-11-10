import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface Props {
  payload: string;
  label: string;
}

function Highlighter({ payload, label }: Props) {
  return (
    <>
      <p>{label}</p>
      <SyntaxHighlighter
        language="json"
        wrapLongLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {payload}
      </SyntaxHighlighter>
    </>
  );
}

export default Highlighter;
