import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge",
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "Crypto Market Snapshot"
    const desc = searchParams.get("desc") || "Base ecosystem data"

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #141E30 0%, #243B55 100%)",
            color: "white",
            fontSize: 40,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: 20 }}>
            {title}
          </div>
          <div style={{ fontSize: 36 }}>{desc}</div>
          <div
            style={{
              marginTop: 40,
              fontSize: 28,
              opacity: 0.7,
            }}
          >
            Powered by Base
          </div>
        </div>
      ),
      {
        width: 800,
        height: 418,
      }
    )
  } catch (err) {
    return new Response("Failed to generate image", { status: 500 })
  }
}
