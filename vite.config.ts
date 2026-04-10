import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import { type Plugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

export function htmlEnvPlugin(): Plugin {
  return {
    name: "vite-plugin-html-env",
    // @ts-ignore
    transformIndexHtml(html, { mode }) {
      const env = loadEnv(mode, process.cwd(), "VITE_");

      return html.replace(/%VITE_(\w+)%/g, (match, key) => {
        const value = env[`VITE_${key}`];

        return value || match;
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const isAnalyze = mode === "analyze";

  return {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src/shared"),
        "@": path.resolve(__dirname, "src/"),
      },
    },

    plugins: [
      htmlEnvPlugin(),
      react(),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/shared/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      nodePolyfills(),
      isAnalyze &&
        visualizer({
          filename: "dist/stats.html",
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: "treemap",
        }),
    ],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    server: {
      port: 3000,
      host: "localhost",
      proxy: {
        "/api/v1": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("antd") || id.includes("@ant-design")) {
                return "vendor-antd";
              }
              if (id.includes("framer-motion")) {
                return "vendor-framer";
              }
              if (id.includes("@dnd-kit")) {
                return "vendor-dnd";
              }

              if (
                id.includes("/react/") ||
                id.includes("/react-dom/") ||
                id.includes("/redux/") ||
                id.includes("/react-router/") ||
                id.includes("/@reduxjs/") ||
                id.includes("/react-hook-form/") ||
                id.includes("/immer/")
              ) {
                return "vendor-core";
              }
            }
          },
        },
      },
    },
  };
});
