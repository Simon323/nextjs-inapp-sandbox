import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface Props {
  payload: string;
}

function Highlighter({ payload }: Props) {
  return (
    <SyntaxHighlighter
      language="json"
      wrapLongLines={true}
      lineProps={{
        style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
      }}
    >
      {payload}
    </SyntaxHighlighter>
  );
}

export default Highlighter;
