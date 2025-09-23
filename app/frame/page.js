"use client";

import { useEffect, useState } from "react";

export default function FramePage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchFrame() {
      try {
        const res = await fetch("/api/frame");
        const data = await res.json();
        // Ambil gambar dari response API
        setImage(data["fc:frame"]?.image);
      } catch (err) {
        console.error("Gagal load frame:", err);
      }
    }
    fetchFrame();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>📊 Frame Preview</h1>
      <p>
        Ini adalah tampilan langsung dari Frame.  
        Cek juga di Warpcast Miniapp.
      </p>

      {image ? (
        <img src={image} alt="Frame snapshot" style={{ marginTop: "1rem", borderRadius: "8px" }} />
      ) : (
        <p>⏳ Loading frame...</p>
      )}
    </main>
  );
}
