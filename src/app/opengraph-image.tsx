import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#0a0a0b",
          color: "#ececec",
        }}
      >
        <div
          style={{
            width: 8,
            height: 80,
            background: "#e8c547",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#e8c547",
            marginTop: 16,
            textTransform: "uppercase",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div style={{ fontSize: 24, color: "#71717a", marginTop: 32 }}>
          Budapest · Érd · Pest megye · Személygépkocsi · Bikázás · Kerékcsere
        </div>
      </div>
    ),
    { ...size },
  );
}
