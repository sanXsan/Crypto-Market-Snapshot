export default async function handler(req, res) {
  try {
    const body = req.body || {}
    const buttonIndex = body.untrustedData?.buttonIndex || "1"

    let title = "Crypto Market Snapshot"
    let description = "Base ecosystem data"
    let image = "https://i.ibb.co/9hD9R9R/crypto.png"

    // ======== Fetch Data Sources ========
    const fetchJSON = async (url) => {
      const r = await fetch(url)
      return r.json()
    }

    // CoinGecko prices
    const prices = await fetchJSON(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,degen-base,aerodrome-finance&vs_currencies=usd"
    )

    // Basescan: Gas price & daily transactions
    const gasData = await fetchJSON(
      "https://api.basescan.org/api?module=proxy&action=eth_gasPrice"
    )
    const txData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailytxn"
    )
export default async function handler(req, res) {
  try {
    const body = req.body || {}
    const buttonIndex = body.untrustedData?.buttonIndex || "1"

    let title = "Crypto Market Snapshot"
    let description = "Base ecosystem data"

    // ======== Fetch Data Sources ========
    const fetchJSON = async (url) => {
      const r = await fetch(url)
      return r.json()
    }

    // CoinGecko prices
    const prices = await fetchJSON(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,degen-base,aerodrome-finance&vs_currencies=usd"
    )

    // Basescan: Gas price & daily transactions
    const gasData = await fetchJSON(
      "https://api.basescan.org/api?module=proxy&action=eth_gasPrice"
    )
    const txData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailytxn"
    )

    // Active wallets (approx daily unique addresses)
    const walletData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailyactiveusers"
    )

    // Parse fetched data
    const btc = prices.bitcoin?.usd || "N/A"
    const eth = prices.ethereum?.usd || "N/A"
    const degen = prices["degen-base"]?.usd || "N/A"
    const aero = prices["aerodrome-finance"]?.usd || "N/A"

    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A"

    const txCount =
      txData.result && txData.result.length > 0
        ? txData.result[txData.result.length - 1].transactionCount
        : "N/A"

    const wallets =
      walletData.result && walletData.result.length > 0
        ? walletData.result[walletData.result.length - 1].uniqueAddressCount
        : "N/A"

    // ======== Switch by Button ========
    switch (buttonIndex) {
      case "1": // BTC/ETH
        title = "BTC & ETH"
        description = `BTC: $${btc} | ETH: $${eth}`
        break
      case "2": // DEGEN
        title = "DEGEN Token"
        description = `Price: $${degen}`
        break
      case "3": // AERO
        title = "AERO Token"
        description = `Price: $${aero}`
        break
      case "4": // Gas & Tx
        title = "Base Gas & Tx"
        description = `Gas: ${gasGwei} gwei | Tx/day: ${txCount}`
        break
      case "5": // Wallets
        title = "Active Wallets"
        description = `Daily active: ${wallets}`
        break
      default:
        title = "Crypto Market Snapshot"
        description = "Choose an option"
        break
    }

    // ======== Dynamic Image via render.js ========
    const image = `https://crypto-market-snapshot.vercel.app/api/render?title=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(description)}`

    // ======== Response Frame ========
    res.setHeader("Content-Type", "text/html")
    res.status(200).send(`
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
    `)
  } catch (error) {
    console.error("Frame error:", error)
    res.status(500).send("Internal Server Error")
  }
}

    // Active wallets (approx daily unique addresses)
    const walletData = await fetchJSON(
      "https://api.basescan.org/api?module=stats&action=dailyactiveusers"
    )

    // Parse fetched data
    const btc = prices.bitcoin?.usd || "N/A"
    const eth = prices.ethereum?.usd || "N/A"
    const degen = prices["degen-base"]?.usd || "N/A"
    const aero = prices["aerodrome-finance"]?.usd || "N/A"

    const gasGwei = gasData.result
      ? (parseInt(gasData.result, 16) / 1e9).toFixed(2)
      : "N/A"

    const txCount =
      txData.result && txData.result.length > 0
        ? txData.result[txData.result.length - 1].transactionCount
        : "N/A"

    const wallets =
      walletData.result && walletData.result.length > 0
        ? walletData.result[walletData.result.length - 1].uniqueAddressCount
        : "N/A"

    // ======== Switch by Button ========
    switch (buttonIndex) {
      case "1": // BTC/ETH
        title = "BTC & ETH"
        description = `BTC: $${btc} | ETH: $${eth}`
        break
      case "2": // DEGEN
        title = "DEGEN Token"
        description = `Price: $${degen}`
        break
      case "3": // AERO
        title = "AERO Token"
        description = `Price: $${aero}`
        break
      case "4": // Gas & Tx
        title = "Base Gas & Transactions"
        description = `Gas: ${gasGwei} gwei | TX/day: ${txCount}`
        break
      case "5": // Wallets
        title = "Active Wallets"
        description = `Daily active: ${wallets}`
        break
      default:
        title = "Crypto Market Snapshot"
        description = "Choose an option"
        break
    }

    // ======== Response Frame ========
    res.setHeader("Content-Type", "text/html")
    res.status(200).send(`
      <html>
        <head>
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="https://i.ibb.co/9hD9R9R/crypto.png" />

          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="https://i.ibb.co/9hD9R9R/crypto.png" />
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
    `)
  } catch (error) {
    console.error("Frame error:", error)
    res.status(500).send("Internal Server Error")
  }
}
