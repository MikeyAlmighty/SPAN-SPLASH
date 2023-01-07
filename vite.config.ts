import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import tailwindConfig from "./tailwind.config.js"

// @ts-ignore
const config: UserConfig = {
   css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig),
        autoprefixer()
      ],
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models")
    },
  },
  plugins: [react()],
}

export default config
