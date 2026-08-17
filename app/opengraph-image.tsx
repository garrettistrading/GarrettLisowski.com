import { ImageResponse } from "next/og";

export const alt = "Garrett Lisowski, financial analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#ffffff",
          color: "#1d1d1f",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", fontSize: 26, fontWeight: 700, gap: 18 }}>
          <span style={{ alignItems: "center", background: "#0066cc", color: "#ffffff", display: "flex", height: 48, justifyContent: "center", width: 48, borderRadius: 8 }}>
            GL
          </span>
          Garrett Lisowski
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 500, letterSpacing: "-0.055em", lineHeight: 0.95, maxWidth: 960 }}>
            Financial analysis for clearer investment and operating decisions.
          </div>
          <div style={{ color: "#7a7a7a", fontSize: 26 }}>
            Financial modeling · Investment research · Portfolio analytics
          </div>
        </div>
      </div>
    ),
    size,
  );
}
