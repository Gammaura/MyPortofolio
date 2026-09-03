import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Arditya Adjie Rosandi";
    const subtitle = searchParams.get("subtitle") || "Full-Stack Developer & IT Project Manager";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0b0f19",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Header Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#2563eb",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#60a5fa",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              GAMMAURA PORTOFOLIO
            </span>
          </div>

          {/* Main Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "900",
                lineHeight: "1.1",
                margin: 0,
                color: "#ffffff",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#94a3b8",
                margin: 0,
                fontWeight: "500",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Ribbon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "24px",
            }}
          >
            <span style={{ fontSize: "18px", color: "#64748b", fontWeight: "bold" }}>
              IPK 3.84 · Universitas Esa Unggul
            </span>
            <span style={{ fontSize: "18px", color: "#3b82f6", fontWeight: "bold" }}>
              https://gammaura.codes
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the OG image`, {
      status: 500,
    });
  }
}
