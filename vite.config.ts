import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import Pages from 'vite-plugin-pages';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [
            react(),
            viteMockServe({
                ignore: /^_/,
                mockPath: 'mock',
                enable: env.VITE_USE_MOCK === 'true'
            }),
            Pages({
                dirs: 'src/pages'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                timers: 'rollup-plugin-node-polyfills/polyfills/timers'
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/styles/common.scss" as *;'
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
        build: {
            chunkSizeWarningLimit: 3000,
            rollupOptions: {
                output: {
                    manualChunks: id => {
                        if (/\/node_modules\/dayjs\/.*/.test(id)) {
                            return 'dayjs';
                        }
                    }
                }
            }
        }
    });
};
