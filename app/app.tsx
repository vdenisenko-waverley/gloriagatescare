import { ReactNode } from "react";
import { App as AntdApp, ConfigProvider, Layout } from "antd";

export default function App({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Metropolis",
        },
        components: {
          Slider: {
            handleSize: 60,
            handleSizeHover: 60,
            handleLineWidthHover: 0,
            trackBg: "#fff",
            trackHoverBg: "#fff",
            railBg: "#fff",
            railHoverBg: "#fff",
            railSize: 8,
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
