interface AppleTransaction {
  originalTransactionId: string;
  environment: "Sandbox" | "Production";
  bundleId: string;
}
