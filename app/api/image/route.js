import { ImageResponse } from "next/og";

// warna khas Base: #1057f0ff (biru gelap), #00C2FF (cyan terang)
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(135deg, #0052FF 0%, #00C2FF 100%)",
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        📊 Base Market Snapshot
        <p style={{ fontSize: 24, fontWeight: "normal", marginTop: 20 }}>
          Real-time Base ecosystem data
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
