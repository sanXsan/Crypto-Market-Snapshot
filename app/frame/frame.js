export default function FramePage() {
  return (
    <html>
      <head>
        <title>Market Snapshot</title>
        <meta property="og:title" content="📊 Market Snapshot" />
        <meta property="og:image" content="https://crypto-market-snapshot.vercel.app/api/frame" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://crypto-market-snapshot.vercel.app/api/frame" />
        <meta property="fc:frame:post_url" content="https://crypto-market-snapshot.vercel.app/api/frame" />
      </head>
      <body style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#4B0082", color:"white" }}>
        <h1>📊 Market Snapshot (Farcaster Frame)</h1>
        <p>Open this inside Farcaster to see the live frame</p>
      </body>
    </html>
  );
}
