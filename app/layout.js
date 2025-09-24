export const metadata = {
  title: "Base Market Snapshot",
  description: "Miniapp for Base ecosystem market data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
