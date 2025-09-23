// app/page.js
import HomeClient from "./HomeClient";

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
    "fc:frame": "vNext",
    "fc:frame:image": "https://crypto-market-snapshot.vercel.app/cms.png",
    "fc:frame:button:1": "BTC/ETH",
    "fc:frame:button:2": "DEGEN",
    "fc:frame:button:3": "AERO",
    "fc:frame:button:4": "Gas & Tx",
    "fc:frame:button:5": "Wallets",
    "fc:frame:post_url": "https://crypto-market-snapshot.vercel.app/api/action",
  },
};

// ⬇️ hanya ini yang di-export
export default function Page() {
  return <HomeClient />;
}
