import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import * as path from "path";
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
    optimizeDeps: {
        force: true,
    },
    server: {
        port: 3000,
    },
    build: {
        ssr: false,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 1600,
        manifest: true,
        rollupOptions: {
            output: {
                globals: {
                    vue: 'Vue',
                },
                minifyInternalExports: true,
            },
            external: ['Vue'],
        },
        modulePreload: {
            polyfill: true,
        },
        commonjsOptions: {
            include: [/node_modules/],
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            vue: 'vue/dist/vue.esm-bundler.js',
            alias: {
                '@': '/resources/js',
            },
        },
    },
});
