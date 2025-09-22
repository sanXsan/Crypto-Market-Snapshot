import { NextResponse } from "next/server";

const COINGECKO = "https://api.coingecko.com/api/v3/simple/price";
const DEXSCREENER = "https://api.dexscreener.com/latest/dex/tokens";
const BASESCAN = "https://api.basescan.org/api";

// Token address di Base
const TOKENS = {
  DEGEN: "0x4ed4E862860bed51a9570b96d89aF5E1b0Efefed",
  AERO: "0x940181a94A35A4569E4529A3CDfB74e38Fd98631"
};

// helper fetch JSON
async function jfetch(url) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  return res.json();
}

// Harga BTC & ETH
async function getBTCETH() {
  const data = await jfetch(`${COINGECKO}?ids=bitcoin,ethereum&vs_currencies=usd`);
  return { btc: data.bitcoin.usd, eth: data.ethereum.usd };
}

// Harga token di Base
async function getTokenPrice(addr) {
  const data = await jfetch(`${DEXSCREENER}/${addr}`);
  return data.pairs?.[0]?.priceUsd || "N/A";
}

// Gas fee rata-rata (gwei)
async function getBaseGas() {
  const data = await jfetch(
    `${BASESCAN}?module=proxy&action=eth_gasPrice&apikey=${process.env.BASESCAN_KEY}`
  );
  return parseInt(data.result, 16) / 1e9; // gwei
}

// Jumlah transaksi harian (BaseScan)
async function getDailyTx() {
  const today = Math.floor(Date.now() / 1000);
  const yesterday = today - 86400;

  const data = await jfetch(
    `${BASESCAN}?module=account&action=txlist&address=0x0000000000000000000000000000000000000000&starttimestamp=${yesterday}&endtimestamp=${today}&sort=asc&apikey=${process.env.BASESCAN_KEY}`
  );

  return data.result?.length || 0;
}

function renderSVG(title, lines) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="600" height="400" fill="black"/>
      <text x="40" y="60" font-size="32" fill="white">${title}</text>
      ${lines.map((t, i) => `<text x="40" y="${140 + i * 40}" font-size="24" fill="orange">${t}</text>`).join("")}
      <text x="40" y="360" font-size="16" fill="gray">Data live • Base</text>
    </svg>
  `;
}

// === HANDLER ===
export async function POST(req) {
  const body = await req.json();
  const view = body?.view || "default";

  let title = "📊 Market Snapshot";
  let lines = [];

  if (view === "degen") {
    const price = await getTokenPrice(TOKENS.DEGEN);
    title = "💎 DEGEN Token";
    lines = [`Price: $${parseFloat(price).toFixed(4)}`];
  } else if (view === "aero") {
    const price = await getTokenPrice(TOKENS.AERO);
    title = "🌀 AERO Token";
    lines = [`Price: $${parseFloat(price).toFixed(4)}`];
  } else if (view === "gas") {
    const gas = await getBaseGas();
    const tx = await getDailyTx();
    title = "⛽ Base Gas & TX";
    lines = [`Avg Gas: ${gas.toFixed(2)} gwei`, `Daily TX: ${tx}`];
  } else if (view === "wallets") {
    // placeholder (gunakan Dune API jika ada key)
    title = "👛 Active Wallets";
    lines = ["24h Active: ~250k (Dune est.)"];
  } else {
    const { btc, eth } = await getBTCETH();
    lines = [`BTC: $${btc}`, `ETH: $${eth}`];
  }

  const image = renderSVG(title, lines);
  const imgBase64 = Buffer.from(image).toString("base64");

  return NextResponse.json({
    "fc:frame": {
      version: "vNext",
      image: `data:image/svg+xml;base64,${imgBase64}`,
      buttons: [
        { label: "BTC/ETH", action: { type: "post", target: "/api/frame", data: { view: "default" } } },
        { label: "DEGEN", action: { type: "post", target: "/api/frame", data: { view: "degen" } } },
        { label: "AERO", action: { type: "post", target: "/api/frame", data: { view: "aero" } } },
        { label: "Gas & Tx", action: { type: "post", target: "/api/frame", data: { view: "gas" } } },
        { label: "Wallets", action: { type: "post", target: "/api/frame", data: { view: "wallets" } } },
        { label: "TX Now", action: { type: "open_url", target: "https://app.uniswap.org/#/swap?chain=base" } }
      ]
    }
  });
}

// Default GET → BTC/ETH snapshot
export async function GET() {
  const { btc, eth } = await getBTCETH();
  const image = renderSVG("📊 Market Snapshot", [`BTC: $${btc}`, `ETH: $${eth}`]);
  const imgBase64 = Buffer.from(image).toString("base64");

  return NextResponse.json({
    "fc:frame": {
      version: "vNext",
      image: `data:image/svg+xml;base64,${imgBase64}`,
      buttons: [
        { label: "BTC/ETH", action: { type: "post", target: "/api/frame", data: { view: "default" } } },
        { label: "DEGEN", action: { type: "post", target: "/api/frame", data: { view: "degen" } } },
        { label: "AERO", action: { type: "post", target: "/api/frame", data: { view: "aero" } } },
        { label: "Gas & Tx", action: { type: "post", target: "/api/frame", data: { view: "gas" } } },
        { label: "Wallets", action: { type: "post", target: "/api/frame", data: { view: "wallets" } } },
        { label: "TX Now", action: { type: "open_url", target: "https://app.uniswap.org/#/swap?chain=base" } }
      ]
    }
  });
}
