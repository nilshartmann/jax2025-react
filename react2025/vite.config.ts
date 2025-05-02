/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // TanStackRouterVite({ target: "react" }),
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",

    setupFiles: ["./vitest-setup.ts"],
    restoreMocks: true,
  },
});
