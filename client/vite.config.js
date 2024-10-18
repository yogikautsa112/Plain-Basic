import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // alias
  resolve: {
    alias: {
      components: path.resolve(__dirname, "/src/components"),
      pages: path.resolve(__dirname, "/src/pages"),
      styles: path.resolve(__dirname, "/src/styles"),
      utils: path.resolve(__dirname, "/src/utils"),
      context: path.resolve(__dirname, "/src/context"),
      hooks: path.resolve(__dirname, "/src/hooks"),
      constants: path.resolve(__dirname, "/src/constants"),
      containers: path.resolve(__dirname, "/src/containers"),
    },
  },
});
