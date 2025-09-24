import { NextResponse } from "next/server";

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,degen-base,aerodrome-finance&vs_currencies=usd";
const BASESCAN = "https://api.basescan.org/api";

async function jfetch(url) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  return res.json();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const buttonIndex = body.untrustedData?.buttonIndex || "1";

    const prices = await jfetch(COINGECKO);
    const btc = prices.bitcoin?.usd || "N/A";
    const eth = prices.ethereum?.usd || "N/A";
    const degen = prices["degen-base"]?.usd || "N/A";
    const aero = prices["aerodrome-finance"]?.usd || "N/A";

    const gasData = await jfetch(`${BASESCAN}?module=proxy&action=eth_gasPrice`);
    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A";

    let title = "📊 Market Snapshot";
    let desc = "Choose data";

    switch (buttonIndex) {
      case "1":
        title = "BTC & ETH";
        desc = `BTC: $${btc} • ETH: $${eth}`;
        break;
      case "2":
        title = "💎 DEGEN";
        desc = `Price: $${degen}`;
        break;
      case "3":
        title = "🌀 AERO";
        desc = `Price: $${aero}`;
        break;
      case "4":
        title = "⛽ Gas Fee";
        desc = `${gasGwei} gwei`;
        break;
      default:
        desc = "Select option";
    }

    // Gunakan endpoint render untuk gambar
    const imageUrl = `https://crypto-market-snapshot.vercel.app/api/render?title=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(desc)}`;

    return NextResponse.json({
      "fc:frame": {
        version: "vNext",
        image: imageUrl,
        post_url: "https://crypto-market-snapshot.vercel.app/api/action",
        buttons: [
          { label: "BTC/ETH", action: { type: "post", target: "/api/action" } },
          { label: "DEGEN", action: { type: "post", target: "/api/action" } },
          { label: "AERO", action: { type: "post", target: "/api/action" } },
          { label: "Gas", action: { type: "post", target: "/api/action" } },
          { label: "Swap", action: { type: "open_url", target: "https://app.uniswap.org/#/swap?chain=base" } },
        ],
      },
    });
  } catch (err) {
    console.error("Action error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "✅ Warpcast frame ready",
  });
}
