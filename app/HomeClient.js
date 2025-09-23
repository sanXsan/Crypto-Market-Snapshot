"use client";

import Script from "next/script";

export default function HomeClient() {
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

      {/* Farcaster SDK → biar splash hilang */}
      <Script
        src="https://cdn.farcaster.xyz/sdk/v1.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.farcaster?.sdk) {
            window.farcaster.sdk.actions.ready();
            console.log("✅ Farcaster Miniapp ready()");
          }
        }}
      />
    </main>
  );
}
