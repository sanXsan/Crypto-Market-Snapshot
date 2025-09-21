import express from "express";
import { getTokenPrices } from "./api/coingecko.js";
import { getDailyTxCount, getGasAverage, getActiveWallets } from "./api/basescan.js";
import { renderFrame } from "./frames/render.js";

const app = express();

// Default Frame: BTC & ETH
app.get("/", async (req, res) => {
  const prices = await getTokenPrices();
  const btc = prices.bitcoin.usd;
  const eth = prices.ethereum.usd;

  const html = renderFrame(
    "BTC & ETH Snapshot",
    `BTC: $${btc} | ETH: $${eth}`,
    [
      { label: "DEGEN", target: "/degen" },
      { label: "AERO", target: "/aero" },
      { label: "Gas", target: "/gas" },
      { label: "Tx", target: "/tx" },
      { label: "Wallets", target: "/wallets" }
    ]
  );
  res.send(html);
});

// DEGEN
app.get("/degen", async (req, res) => {
  const prices = await getTokenPrices();
  const price = prices["degen-base"].usd;

  res.send(renderFrame("DEGEN Token", `Price: $${price}`, [
    { label: "Back", target: "/" }
  ]));
});

// AERO
app.get("/aero", async (req, res) => {
  const prices = await getTokenPrices();
  const price = prices["aerodrome-finance"].usd;

  res.send(renderFrame("AERO Token", `Price: $${price}`, [
    { label: "Back", target: "/" }
  ]));
});

// Gas Fee
app.get("/gas", async (req, res) => {
  const gas = await getGasAverage();

  res.send(renderFrame("Base Gas Fee", `${gas} gwei`, [
    { label: "Back", target: "/" }
  ]));
});

// Transactions
app.get("/tx", async (req, res) => {
  const tx = await getDailyTxCount();
  const latest = tx[tx.length - 1];
  const info = latest ? `${latest.transactions} tx on ${latest.date}` : "No data";

  res.send(renderFrame("Daily Transactions", info, [
    { label: "Back", target: "/" }
  ]));
});

// Active Wallets
app.get("/wallets", async (req, res) => {
  const wallets = await getActiveWallets();
  const latest = wallets[wallets.length - 1];
  const info = latest ? `${latest.users} wallets on ${latest.date}` : "No data";

  res.send(renderFrame("Active Wallets", info, [
    { label: "Back", target: "/" }
  ]));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
