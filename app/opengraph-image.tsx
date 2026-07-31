import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social share card. Rendered entirely from brand colors/copy
 * already published elsewhere on the site — no new claims, no external
 * image decode dependency (avoids Satori image-format edge cases).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07154D",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 8,
              background: "#C02F0A",
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#FFFFFF",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            TWS Southeast Florida
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#C02F0A",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          ICRA-Rated Containment · Southeast Florida
        </div>
        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Renovate without shutting down.
        </div>
      </div>
    ),
    { ...size }
  );
}
