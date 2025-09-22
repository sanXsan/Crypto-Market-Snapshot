import { ImageResponse } from "next/og";

// Konfigurasi runtime agar pakai Edge
export const runtime = "edge";

// API Route
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Crypto Market Snapshot";
    const desc = searchParams.get("desc") || "Base ecosystem data";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg,#0f172a,#1e293b)",
            color: "white",
            fontFamily: "sans-serif",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 60, marginBottom: 20 }}>{title}</h1>
          <p style={{ fontSize: 32, opacity: 0.9 }}>{desc}</p>
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    );
  } catch (err) {
    console.error("Render error:", err);
    return new Response("Failed to generate image", { status: 500 });
  }
}
