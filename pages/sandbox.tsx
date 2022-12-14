import React from "react";

function Sandbox() {
  return (
    <main className="flex justify-center items-start p-4 h-screen w-full bg-gradient-to-r from-green-100 to-blue-100">
      <div className="bg-white w-full border border-gray-200 divide-y divide-gray-200">
        <details>
          <summary className="question py-3 px-4 cursor-pointer select-none w-full outline-none">
            How is this made?
          </summary>
          <p className="pt-1 pb-3 px-4">
            With the HTML5 <code className="text-sm text-red-500">details</code>{" "}
            element and some Tailwind for showcase.
          </p>
        </details>
        <details>
          <summary className="question py-3 px-4 cursor-pointer select-none w-full">
            Can I use it?
          </summary>
          <p className="pt-1 pb-3 px-4">
            Of course. It's yours to use wherever and whenever you like.
          </p>
        </details>
      </div>
    </main>
  );
}

export default Sandbox;
