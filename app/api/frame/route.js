// app/api/frame/route.js
import { NextResponse } from "next/server";

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

async function jfetch(url) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  return res.json();
}

export async function GET() {
  try {
    const prices = await jfetch(COINGECKO);
    const btc = prices.bitcoin?.usd || "N/A";
    const eth = prices.ethereum?.usd || "N/A";

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
        <rect width="600" height="400" fill="black"/>
        <text x="40" y="60" font-size="32" fill="white">📊 Market Snapshot</text>
        <text x="40" y="160" font-size="24" fill="orange">BTC: $${btc}</text>
        <text x="40" y="200" font-size="24" fill="orange">ETH: $${eth}</text>
        <text x="40" y="360" font-size="16" fill="gray">Data live • Base</text>
      </svg>
    `;
    const imgBase64 = Buffer.from(svg).toString("base64");

    return NextResponse.json({
      "fc:frame": {
        version: "vNext",
        image: `data:image/svg+xml;base64,${imgBase64}`,
        buttons: [
          {
            label: "BTC/ETH",
            action: { type: "post", target: "/api/action", data: { view: "1" } },
          },
          {
            label: "DEGEN",
            action: { type: "post", target: "/api/action", data: { view: "2" } },
          },
          {
            label: "AERO",
            action: { type: "post", target: "/api/action", data: { view: "3" } },
          },
          {
            label: "Gas",
            action: { type: "post", target: "/api/action", data: { view: "4" } },
          },
          {
            label: "Swap",
            action: {
              type: "open_url",
              target: "https://app.uniswap.org/#/swap?chain=base",
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error("Frame error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  // kalau POST ke /api/frame, langsung balikin GET snapshot
  return GET();
}
