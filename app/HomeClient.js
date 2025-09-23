"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function HomeClient() {
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        console.log("✅ Farcaster Miniapp ready() called");
      } catch (err) {
        console.error("❌ Error calling sdk.actions.ready()", err);
      }
    };
    init();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Crypto Market Snapshot</h1>
      <p>
        This page powers the Warpcast Frame and Miniapp. <br />
        Open it inside Warpcast to interact with buttons:
      </p>
      <ul>
        <li><a href="/frame">/frame</a></li>
        <li><a href="/action">/action</a></li>
        <li><a href="/coingecko">/coingecko</a></li>
        <li><a href="/basescan?type=gas">/basescan?type=gas</a></li>
        <li><a href="/render?title=Test&desc=Hello">/render</a></li>
      </ul>
    </main>
  );
}
