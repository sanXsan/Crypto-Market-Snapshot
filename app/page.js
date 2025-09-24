"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div>
      <h1>📊 Base Market Snapshot</h1>
      <p>Welcome to the miniapp!</p>
    </div>
  );
}
