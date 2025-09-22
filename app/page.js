// app/page.js
export const metadata = {
  title: "Crypto Market Snapshot",
  description: "Frame entry point for Base ecosystem data",
};

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>✅ Crypto Market Snapshot</h1>
      <p>
        API endpoints aktif di Vercel:
      </p>
      <ul>
        <li><a href="/api/frame">/api/frame</a></li>
        <li><a href="/api/action">/api/action</a></li>
        <li><a href="/api/coingecko">/api/coingecko</a></li>
        <li><a href="/api/basescan?type=gas">/api/basescan?type=gas</a></li>
        <li><a href="/api/render?title=Test&desc=Hello">/api/render</a></li>
      </ul>
    </main>
  );
}
