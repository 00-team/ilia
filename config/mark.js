import { readdirSync, lstatSync } from 'fs'
import { resolve } from 'path'

const BASE_DIR = resolve('.')
const DIR = resolve(BASE_DIR, 'mark/')

let entry = {}

function load_paths(path) {
    let stats = lstatSync(path)
    if (stats.isDirectory()) {
        readdirSync(path).forEach(e => {
            load_paths(resolve(path, e))
        })
        return
    }

    if (stats.isFile() && path.endsWith('.ts')) {
        let fn = path.substring(path.lastIndexOf('/') + 1)
        fn = fn.substring(0, fn.lastIndexOf('.'))
        entry[fn] = path
        return
    }
}

load_paths(DIR)

const Config = {
    mode: 'production',
    entry,
    output: {
        path: resolve(BASE_DIR, 'static/mark/js/'),
        clean: true,
        filename: '[name].js',
        sourceMapFilename: 'source_maps/[file].map',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    devtool: 'source-map',
    plugins: [],
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
        plugins: [],
    },
    optimization: {
        emitOnErrors: false,
        chunkIds: 'deterministic',
        minimize: true,
    },
}

export default Config
