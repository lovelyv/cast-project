import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  console.log("mode is:", mode); // production, development, github etc.

const routerBasename = mode === "github" ? "/cast-project/" : "/";

  return {
   base: routerBasename,
    define: {
      "import.meta.env.VITE_ROUTER_BASENAME": JSON.stringify(routerBasename)
    },
    plugins: [react()]
  };
});




