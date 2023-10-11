import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

export default defineConfig({
    plugins: [
        devtools({
            autoname: true,
            locator: {
                key: 'Meta',
            },
        }),
        solidPlugin(),
    ],
    root: 'app',
    server: {
        port: 8130,
    },
    build: {
        target: 'esnext',
        outDir: '../static/dash/',
    },
})
