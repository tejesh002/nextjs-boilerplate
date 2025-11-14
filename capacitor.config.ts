import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kraft.app",
  appName: "Kraft",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
  },
};

export default config;

