"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleClick = async (view) => {
    // ✅ pakai post ke frame, bukan openUrl
    await sdk.actions.post({
      url: "/api/action",
      data: { view },
    });
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(135deg, #0052FF 0%, #00C2FF 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
        📊 Base Market Snapshot
      </h1>
      <p style={{ color: "#eee", marginBottom: "2rem" }}>
        Select the data you want to see:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <button onClick={() => handleClick("btceth")} style={btnStyle}>
          BTC/ETH
        </button>
        <button onClick={() => handleClick("degen")} style={btnStyle}>
          DEGEN
        </button>
        <button onClick={() => handleClick("aero")} style={btnStyle}>
          AERO
        </button>
        <button onClick={() => handleClick("gas")} style={btnStyle}>
          Gas & Tx
        </button>
        <button onClick={() => handleClick("wallets")} style={btnStyle}>
          Wallets
        </button>
        <button
          onClick={() =>
            sdk.actions.openUrl("https://app.uniswap.org/#/swap?chain=base")
          }
          style={btnStyle}
        >
          TX Now
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "1rem",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  transition: "all 0.2s ease",
};
