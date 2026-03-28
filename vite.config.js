import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const distDir = path.resolve(rootDir, "dist");

const copyDataDir = () => ({
  name: "copy-data-dir",
  writeBundle() {
    fs.cpSync(path.resolve(rootDir, "data"), path.resolve(distDir, "data"), {
      recursive: true
    });
  }
});

export default defineConfig({
  plugins: [react(), copyDataDir()],
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(rootDir, "index.html"),
        tracker: path.resolve(rootDir, "tracker.html")
      }
    }
  }
});
