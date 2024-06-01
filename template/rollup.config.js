import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import postcss from "rollup-plugin-postcss"
import dts from "rollup-plugin-dts"
import { terser } from "rollup-plugin-terser"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"
import svgr from "@svgr/rollup"
import url from "@rollup/plugin-url"
import image from "@rollup/plugin-image"
const packageJson = require("./package.json")

export default [
   {
      input: "src/index.ts",
      output: [
         {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
         },
         {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
         }
      ],
      plugins: [
         excludeDependenciesFromBundle({
            dependencies: true,
            peerDependencies: true
         }),
         image(),
         peerDepsExternal(),
         resolve(),
         commonjs(),
         url(),
         svgr({ typescript: true }),
         typescript({
            tsconfig: "./tsconfig.json"
         }),

         postcss(),
         terser()
      ],
      external: ["react", "@types/react", "react-dom", "prop-types", "@testing-library/react", "jest"]
   },
   {
      input: "dist/esm/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
      external: [/\.css$/]
   }
]
