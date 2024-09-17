import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/dashboard",
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_PORT || "9089"), // Use the environment variable PORT if available
  },
});
