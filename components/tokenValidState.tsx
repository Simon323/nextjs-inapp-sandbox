import React from "react";

interface Props {
  state: boolean | undefined;
}

function TokenValidState({ state }: Props) {
  const isInvalid = () => (
    <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
      Invalid Token
    </span>
  );

  const isValid = () => (
    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
      Valid Token
    </span>
  );

  return state ? isValid() : isInvalid();
}

export default TokenValidState;
