import {defineConfig, loadEnv, splitVendorChunkPlugin} from 'vite';
import vue from '@vitejs/plugin-vue';
import {ViteMinifyPlugin} from 'vite-plugin-minify';
import {createHtmlPlugin} from 'vite-plugin-html';
import {esbuildCommonjs} from '@originjs/vite-plugin-commonjs';
import legacy from '@vitejs/plugin-legacy';
import viteImagemin from 'vite-plugin-imagemin';
import * as path from "path";
import laravel from "laravel-vite-plugin";

const corsConf = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        optimizeDeps: {
            force: true,
            esbuildOptions: {
                plugins: [esbuildCommonjs()],
            },
        },
        server: {
            cors: corsConf,
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
                    manualChunks(id, {getModuleInfo}) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                        const match = /.*\.strings\.(\w+)\.js/.exec(id);
                        if (match) {
                            const language = match[1]; // e.g. "en"
                            const dependentEntryPoints = [];

                            // we use a Set here so we handle each module at most once. This
                            // prevents infinite loops in case of circular dependencies
                            // @ts-ignore
                            const idsToHandle = new Set(getModuleInfo(id).dynamicImporters);

                            // @ts-ignore
                            for (const moduleId of idsToHandle) {
                                // @ts-ignore
                                const {isEntry, dynamicImporters, importers} =
                                    getModuleInfo(moduleId);
                                if (isEntry || dynamicImporters.length > 0)
                                    dependentEntryPoints.push(moduleId);

                                // The Set iterator is intelligent enough to iterate over
                                // elements that are added during iteration
                                for (const importerId of importers) idsToHandle.add(importerId);
                            }

                            // If there is a unique entry, we put it into a chunk based on the
                            // entry name
                            if (dependentEntryPoints.length === 1) {
                                return `${dependentEntryPoints[0].split('/').slice(-1)[0].split('.')[0]
                                }.strings.${language}`;
                            }
                            // For multiple entries, we put it into a "shared" chunk
                            if (dependentEntryPoints.length > 1) {
                                return `shared.strings.${language}`;
                            }
                        }
                    }
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
                    'resources/css/app.css',
                    'resources/js/app.ts'
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
            viteImagemin({
                gifsicle: {
                    optimizationLevel: 7,
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 7,
                },
                mozjpeg: {
                    quality: 20,
                },
                pngquant: {
                    quality: [0.8, 0.9],
                    speed: 4,
                },
                svgo: {
                    plugins: [
                        {
                            name: 'removeViewBox',
                        },
                        {
                            name: 'removeEmptyAttrs',
                            active: false,
                        },
                    ],
                },
            }),
            legacy({
                targets: ['defaults', 'not IE 11'],
                polyfills: true,
            }),
            splitVendorChunkPlugin(),
            createHtmlPlugin({
                minify: true,
                entry: 'resources/js/app.ts',
            }),
            ViteMinifyPlugin({
                minifyCSS: true,
                removeComments: true,
            }),
        ],
        resolve: {
            alias: {
                // '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
                vue: 'vue/dist/vue.esm-bundler.js',
                '~': path.resolve(__dirname, 'node_modules'),
                '@': path.resolve(__dirname, 'resources/js'),
                '@css': path.resolve(__dirname, 'resources/css'),
                '@img': path.resolve(__dirname, 'resources/img'),
                '@views': path.resolve(__dirname, 'resources/js/views'),
                '@pages': path.resolve(__dirname, 'resources/js/views/pages'),
                '@stores': path.resolve(__dirname, 'resources/js/stores'),
                '@services': path.resolve(__dirname, 'resources/js/services'),
                '@router': path.resolve(__dirname, 'resources/js/router'),
                '@components': path.resolve(__dirname, 'resources/js/components'),
            },
        },
    }
});
