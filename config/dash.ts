import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        devtools({
            autoname: true,
            locator: {
                key: 'Meta',
            },
        }),
        solidPlugin({ hot: false }),
    ],
    server: {
        port: 8130,
        proxy: {
            '/api/': {
                target: 'http://localhost:7130',
                changeOrigin: true,
            },
        },
    },
    build: {
        target: 'esnext',
        outDir: 'static/dash/',
        watch: {
            clearScreen: true,
        },
        rollupOptions: {},
    },
    base: '/static/dash/',
    resolve: {
        alias: { '!': resolve(__dirname, '../app') },
    },
})
