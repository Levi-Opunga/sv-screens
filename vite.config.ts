import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { run } from "vite-plugin-run";

import fs from "fs";
import path from "path";

const generateInputConfig = () => {
  const screensDir = path.resolve(__dirname, "html");
  const screens = fs
    .readdirSync(screensDir)
    .filter((file) => file.endsWith(".html"));
  const inputConfig: Record<string, string> = {};

  screens.forEach((screen) => {
    const screenName = path.basename(screen, ".html");
    inputConfig[screenName] = path.resolve(screensDir, screen);
  });
  console.log(inputConfig);
  return inputConfig;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    run([
      {
        name: "generate-tree",
        run: ["npm", "run", "generate-tree"],
        pattern: ["**/*.svelte", "**/*.ts", "**/*.js"],
      },
    ]),
  ],
  build: {
    rollupOptions: {
      input: {
        ...generateInputConfig(),
      },
      output: {
        name: "sv-screens",
        entryFileNames: "screens/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        format: "es",
      },
    },
  },
});
