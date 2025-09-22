export const metadata = {
  title: "Crypto Market Snapshot",
  description:
    "Crypto market snapshot for Base ecosystem. Check BTC, ETH, DEGEN, AERO, Gas, TX, Wallets.",
  openGraph: {
    title: "Crypto Market Snapshot",
    description:
      "Crypto market snapshot for Base ecosystem. Check BTC, ETH, DEGEN, AERO, Gas, TX, Wallets.",
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
    <main>
      <h1>Crypto Market Snapshot</h1>
      <p>
        This page powers the Warpcast Frame. Open it in Warpcast to see
        interactive buttons.
      </p>
    </main>
  );
}
