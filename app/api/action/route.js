// app/api/action/route.js
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

    // ambil harga dari coingecko
    const prices = await jfetch(COINGECKO);
    const btc = prices.bitcoin?.usd || "N/A";
    const eth = prices.ethereum?.usd || "N/A";
    const degen = prices["degen-base"]?.usd || "N/A";
    const aero = prices["aerodrome-finance"]?.usd || "N/A";

    // ambil data dari basescan
    const gasData = await jfetch(`${BASESCAN}?module=proxy&action=eth_gasPrice`);
    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A";

    let title = "📊 Market Snapshot";
    let lines = [];

    switch (buttonIndex) {
      case "1":
        title = "BTC & ETH";
        lines = [`BTC: $${btc}`, `ETH: $${eth}`];
        break;
      case "2":
        title = "💎 DEGEN";
        lines = [`Price: $${degen}`];
        break;
      case "3":
        title = "🌀 AERO";
        lines = [`Price: $${aero}`];
        break;
      case "4":
        title = "⛽ Base Gas";
        lines = [`Gas: ${gasGwei} gwei`];
        break;
      default:
        lines = ["Choose an option"];
    }

    // bikin gambar SVG sederhana
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
        <rect width="600" height="400" fill="black"/>
        <text x="40" y="60" font-size="32" fill="white">${title}</text>
        ${lines
          .map(
            (t, i) =>
              `<text x="40" y="${140 + i * 40}" font-size="24" fill="orange">${t}</text>`
          )
          .join("")}
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
    console.error("Action error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "✅ Action endpoint ready for Warpcast",
  });
}
