import { ImageResponse } from "next/og";

export const alt = "Varuna Kumari — AI and Full Stack Developer";
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
          padding: "80px",
          color: "#e9f2fb",
          background: "linear-gradient(135deg, #07111f 0%, #10233c 55%, #172d49 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ color: "#9fc5e8", fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
          Portfolio · AI · Full Stack
        </div>
        <div style={{ marginTop: 34, fontSize: 82, fontWeight: 700, letterSpacing: -4 }}>
          Varuna Kumari
        </div>
        <div style={{ marginTop: 24, color: "#cfe0f2", fontSize: 34 }}>
          Building thoughtful software with AI and the web.
        </div>
        <div style={{ position: "absolute", right: 74, bottom: 45, color: "#7aa6d0", fontSize: 20 }}>
          varunakumari
        </div>
      </div>
    ),
    { ...size },
  );
}
