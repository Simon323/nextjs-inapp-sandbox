import React from "react";

function AppleTransaction({
  bundleId,
  environment,
  originalTransactionId,
}: AppleTransaction) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="flex flex-col">
        <strong className="pb-5">Apple Transaction</strong>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="apple-bundleId"
            >
              BundleId
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="apple-bundleId"
              type="text"
              placeholder="BundleId"
              value={bundleId}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="apple-environment"
            >
              Environment
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="apple-environment"
              type="text"
              placeholder="Environment"
              value={environment}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="apple-originalTransactionId"
            >
              Original TransactionId
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="apple-originalTransactionId"
              type="text"
              placeholder="OriginalTransactionId"
              value={originalTransactionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppleTransaction;
