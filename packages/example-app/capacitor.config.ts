import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.github.palmshed.bridge.example",
  appName: "Bridge Example",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
