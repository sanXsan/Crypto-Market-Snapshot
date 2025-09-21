export default async function handler(req, res) {
  const { body } = req;
  const coin = (req.query.coin || "bitcoin").toLowerCase();

  // Tombol ditekan user
  const button = body?.untrustedData?.buttonIndex || 1;
  const selectedCoin =
    button === 1 ? "bitcoin" : button === 2 ? "ethereum" : "solana";

  return res.redirect(`/api/index?coin=${selectedCoin}`);
}
