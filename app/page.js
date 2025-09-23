// app/page.js
import HomeClient from "./HomeClient"
import { sdk } from '@farcaster/miniapp-sdk'

export const metadata = {
  title: "Crypto Market Snapshot",
  description:
    "Crypto market snapshot for Base ecosystem. Check BTC, ETH, DEGEN, AERO, Gas, Tx, Wallets.",
  openGraph: {
    title: "Crypto Market Snapshot",
    description:
      "Crypto market snapshot for Base ecosystem. Check BTC, ETH, DEGEN, AERO, Gas, Tx, Wallets.",
    images: ["https://crypto-market-snapshot.vercel.app/cms.png"],
  },
  other: {
    // Warpcast Frame Metadata
    "fc:frame": "vNext",
    "fc:frame:image": "https://crypto-market-snapshot.vercel.app/cms.png",

    // Buttons
    "fc:frame:button:1": "BTC/ETH",
    "fc:frame:button:2": "DEGEN",
    "fc:frame:button:3": "AERO",
    "fc:frame:button:4": "Gas & Tx",
    "fc:frame:button:5": "Wallets",

    // API action handler
    "fc:frame:post_url":
      "https://crypto-market-snapshot.vercel.app/api/action",
  },
};

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Crypto Market Snapshot</h1>
      <p>
        This page powers the Warpcast Frame. <br />
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
await sdk.actions.ready()
