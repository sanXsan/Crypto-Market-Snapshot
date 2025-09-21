import fetch from "node-fetch";

export default async function handler(req, res) {
  const coin = (req.query.coin || "bitcoin").toLowerCase();

  // Ambil data harga dari CoinGecko
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
  const data = await fetch(url).then(r => r.json());

  if (!data[coin]) {
    return res.status(404).send("Coin not found");
  }

  const price = data[coin].usd;
  const change = data[coin].usd_24h_change.toFixed(2);
  const marketCap = (data[coin].usd_market_cap / 1e9).toFixed(2);
  const volume = (data[coin].usd_24h_vol / 1e9).toFixed(2);

  // Generate sparkline chart via QuickChart (dummy random data untuk sekarang)
  const chartUrl = `https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[1,2,3,2,4,3,5]}]}}`;

  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="${coin.toUpperCase()} • $${price}" />
        <meta property="og:description" content="24h: ${change}% • MC: $${marketCap}B • Vol: $${volume}B" />
        <meta property="og:image" content="${chartUrl}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:button:1" content="BTC" />
        <meta property="fc:frame:button:2" content="ETH" />
        <meta property="fc:frame:button:3" content="SOL" />
        <meta property="fc:frame:post_url" content="${process.env.BASE_URL}/api/action?coin=${coin}" />
      </head>
    </html>
  `);
}
