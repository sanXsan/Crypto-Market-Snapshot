export default function Home() {
  return (
    <>
      <head>
        <title>Crypto Market Snapshot</title>
        <meta property="og:title" content="Crypto Market Snapshot" />
        <meta
          property="og:description"
          content="Crypto market snapshot for Base ecosystem. Check BTC, ETH, DEGEN, AERO, Gas, TX, Wallets."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/9hD9R9R/crypto.png"
        />

        {/* Frame Metadata for Warpcast */}
        <meta name="fc:frame" content="vNext" />
        <meta
          name="fc:frame:image"
          content="https://i.ibb.co/9hD9R9R/crypto.png"
        />

        {/* Buttons */}
        <meta name="fc:frame:button:1" content="BTC/ETH" />
        <meta name="fc:frame:button:2" content="DEGEN" />
        <meta name="fc:frame:button:3" content="AERO" />
        <meta name="fc:frame:button:4" content="Gas & Tx" />
        <meta name="fc:frame:button:5" content="Wallets" />

        {/* API action handler */}
        <meta
          name="fc:frame:post_url"
          content="https://crypto-market-snapshot.vercel.app/api/action"
        />
      </head>
      <main>
        <h1>Crypto Market Snapshot</h1>
        <p>
          This page powers the Warpcast Frame. Open it in Warpcast to see
          interactive buttons.
        </p>
      </main>
    </>
  )
}
