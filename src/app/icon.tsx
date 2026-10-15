import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: yellow flatbed tow silhouette on dark background. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 26,
            height: 18,
            alignItems: "flex-end",
          }}
        >
          {/* Hook arm */}
          <div
            style={{
              position: "absolute",
              left: 2,
              top: 0,
              width: 2,
              height: 8,
              background: "#e8c547",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 2,
              top: 0,
              width: 7,
              height: 2,
              background: "#e8c547",
              borderRadius: 1,
            }}
          />
          {/* Flatbed */}
          <div
            style={{
              position: "absolute",
              left: 1,
              bottom: 5,
              width: 15,
              height: 3,
              background: "#e8c547",
              borderRadius: 1,
            }}
          />
          {/* Cab */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 5,
              width: 9,
              height: 9,
              background: "#e8c547",
              borderRadius: 2,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 2,
            }}
          >
            <div
              style={{
                width: 5,
                height: 3,
                background: "#0a0a0b",
                borderRadius: 1,
              }}
            />
          </div>
          {/* Wheels */}
          <div
            style={{
              position: "absolute",
              left: 5,
              bottom: 0,
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "#e8c547",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 2,
              bottom: 0,
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "#e8c547",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
