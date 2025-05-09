import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";
import serveStatic from "serve-static";
import path from "path";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

// Helper function to resolve node_modules path (kept for dev server, but not used by viteStaticCopy anymore)
const resolveNodeModuleForDevServer = (modulePath: string) =>
  path.resolve(process.cwd(), "node_modules", modulePath);

// Custom plugin to serve Excalidraw assets in dev
const serveExcalidrawAssetsDev = (): Plugin => {
  return {
    name: "vite-plugin-serve-excalidraw-assets-dev",
    configureServer(server) {
      server.middlewares.use(
        "/excalidraw-assets",
        serveStatic(
          resolveNodeModuleForDevServer(
            "@excalidraw/excalidraw/dist/excalidraw-assets"
          )
        )
      );
    },
  };
};

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@excalidraw/excalidraw/dist/excalidraw-assets/**/*",
          dest: "excalidraw-assets",
        },
      ],
    }),
    serveExcalidrawAssetsDev(),
  ],
  define: {
    "process.env.IS_PREACT": JSON.stringify("false"),
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress eval warning from excalidraw.development.js
        if (
          warning.code === "EVAL" &&
          warning.id?.includes("excalidraw.development.js")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
