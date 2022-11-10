import React from "react";
import uniqueId from "lodash.uniqueid";

interface Props {
  name: string;
  checked: boolean;
  fnChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ name, checked, fnChange }: Props) {
  const id = uniqueId("prefix-");
  return (
    <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={fnChange}
        name="bordered-checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={id}
        className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {name}
      </label>
    </div>
  );
}

export default Checkbox;
