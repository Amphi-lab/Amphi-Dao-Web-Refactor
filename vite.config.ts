import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/common/common.scss" as *;'
            }
        }
    },
    // build: {
    //     rollupOptions: {
    //         plugins: [polyfillNode()],
    //     }
    // },
    // optimizeDeps: {
    //     exclude: ["events"],
    // },
})

