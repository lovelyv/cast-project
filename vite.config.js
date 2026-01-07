import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  console.log("mode is:", mode); // production, development, github etc.

  return {
    base: mode === "github" ? "/cast-project/" : "/",
    plugins: []
  };
});



