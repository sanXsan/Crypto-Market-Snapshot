"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleClick = (view) => {
    // Panggil API Frame sesuai tombol
    sdk.actions.openUrl(`/api/frame?view=${view}`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
        📊 Base Market Snapshot
      </h1>
      <p style={{ color: "#555", marginBottom: "2rem" }}>
        Pilih data yang ingin kamu lihat:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => handleClick("btceth")}
          style={btnStyle}
        >
          BTC/ETH
        </button>

        <button
          onClick={() => handleClick("degen")}
          style={btnStyle}
        >
          DEGEN
        </button>

        <button
          onClick={() => handleClick("aero")}
          style={btnStyle}
        >
          AERO
        </button>

        <button
          onClick={() => handleClick("gas")}
          style={btnStyle}
        >
          Gas & Tx
        </button>

        <button
          onClick={() => handleClick("wallets")}
          style={btnStyle}
        >
          Wallets
        </button>

        <button
          onClick={() => handleClick("tx")}
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
  border: "1px solid #ccc",
  fontSize: "1rem",
  cursor: "pointer",
  backgroundColor: "#f8f8f8",
  transition: "all 0.2s ease",
};
