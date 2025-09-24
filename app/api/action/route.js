export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { sdk } from "@farcaster/miniapp-sdk";

export async function POST(req) {
  try {
    sdk.actions.ready();
    const body = await req.json();
    const buttonIndex = body.untrustedData?.buttonIndex || "1";

    let title = "Crypto Market Snapshot";
    let description = "Base ecosystem data";

    const fetchJSON = async (url) => {
      const r = await fetch(url);
      return r.json();
    };

    // CoinGecko
    const prices = await fetchJSON(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,degen-base,aerodrome-finance&vs_currencies=usd"
    );

    // BaseScan
    const gasData = await fetchJSON(
      "https://api.basescan.org/api?module=proxy&action=eth_gasPrice"
    );
    const txData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailytxn"
    );
    const walletData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailyactiveusers"
    );

    const btc = prices.bitcoin?.usd || "N/A";
    const eth = prices.ethereum?.usd || "N/A";
    const degen = prices["degen-base"]?.usd || "N/A";
    const aero = prices["aerodrome-finance"]?.usd || "N/A";

    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A";

    const txCount =
      txData.result?.length > 0
        ? txData.result[txData.result.length - 1].transactionCount
        : "N/A";

    const wallets =
      walletData.result?.length > 0
        ? walletData.result[walletData.result.length - 1].uniqueAddressCount
        : "N/A";

    switch (buttonIndex) {
      case "1":
        title = "BTC & ETH";
        description = `BTC: $${btc} | ETH: $${eth}`;
        break;
      case "2":
        title = "DEGEN Token";
        description = `Price: $${degen}`;
        break;
      case "3":
        title = "AERO Token";
        description = `Price: $${aero}`;
        break;
      case "4":
        title = "Base Gas & Tx";
        description = `Gas: ${gasGwei} gwei | Tx/day: ${txCount}`;
        break;
      case "5":
        title = "Active Wallets";
        description = `Daily active: ${wallets}`;
        break;
      default:
        title = "Crypto Market Snapshot";
        description = "Choose an option";
    }

    const image = `https://crypto-market-snapshot.vercel.app/api/render?title=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(description)}`;

    return new Response(
      `
      <html>
        <head>
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />

          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${image}" />
          <meta name="fc:frame:button:1" content="BTC/ETH" />
          <meta name="fc:frame:button:2" content="DEGEN" />
          <meta name="fc:frame:button:3" content="AERO" />
          <meta name="fc:frame:button:4" content="Gas & Tx" />
          <meta name="fc:frame:button:5" content="Wallets" />
          <meta name="fc:frame:post_url" content="https://crypto-market-snapshot.vercel.app/api/action" />
        </head>
        <body>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
      </html>
    `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("Action error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Tambahin GET biar kalau dibuka di browser gak 404
export async function GET() {
  return NextResponse.json({
    message: "Action endpoint ready. Use POST with Warpcast frame.",
  });
}
