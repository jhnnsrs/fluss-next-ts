import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],

  server: {
    port: 7890,
  },
  build: {
    lib: {
      entry: "src/fluss/index.tsx",
      name: "fluss",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@apollo/client",
        "graphql-ws"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@apollo/client": "ApolloClient",
          "graphql-ws": "graphqlWs",
          graphql: "graphql",
        },
      },
    },
  },
});
