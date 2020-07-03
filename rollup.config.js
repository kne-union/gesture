import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

import path from 'path';

export default [
    {
        input: 'lib/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            })
        ]
    },
    {
        input: 'lib/index.js',
        output: [
            {
                file: 'dist/gesture.js',
                name: "gesture",
                format: 'umd',
                sourcemap: true
            },
            {
                file: 'dist/gesture.min.js',
                name: "gesture",
                format: 'umd',
                sourcemap: true,
                plugins: [terser()]
            }
        ],
        plugins: [
            external(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            resolve(),
            commonjs()
        ]
    }
]
