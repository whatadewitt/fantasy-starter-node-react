import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()], // you'll likely want a real cert over mkcert here, but it will do
  server: {
    host: "192.168.1.47", // TODO: likely you want to remove this
    https: "true",
    proxy: {
      "/api": {
        target: "https://192.168.1.47:3000", // this will need to point at your express server
        changeOrigin: false,
        secure: false, // likely not something you want in production but this was built with a self-signed cert
      },
    },
  },
});
