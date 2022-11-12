/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require("quasar/wrappers");
const path = require("path");

module.exports = configure(function (/* ctx */) {
    return {
        eslint: {
            // fix: true,
            // include = [],
            // exclude = [],
            // rawOptions = {},
            warnings: true,
            errors: true,
        },

        // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli-vite/boot-files
        boot: ["i18n", "axios", "firebase", "api"],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: ["app.sass"],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            "roboto-font", // optional, you are not bound to it
            "material-icons", // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
            target: {
                browser: [
                    "es2019",
                    "edge88",
                    "firefox78",
                    "chrome87",
                    "safari13.1",
                ],
                node: "node16",
            },

            vueRouterMode: "hash", // available values: 'hash', 'history'
            // vueRouterBase,
            // vueDevtools,
            // vueOptionsAPI: false,

            // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

            // publicPath: '/',
            // analyze: true,
            // env: {},
            // rawDefine: {}
            // ignorePublicFolder: true,
            // minify: false,
            // polyfillModulePreload: true,
            // distDir

            // extendViteConf (viteConf) {},
            // viteVuePluginOptions: {},

            vitePlugins: [
                [
                    "@intlify/vite-plugin-vue-i18n",
                    {
                        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
                        // compositionOnly: false,

                        // you need to set i18n resource including paths !
                        include: path.resolve(__dirname, "./src/i18n/**"),
                    },
                ],
            ],
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
            open: false,
            // https: true
        },

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
            config: {
                brand: {
                    cream: "#E6DAC0",
                    gold: "#C1AF8A",
                    a: "162, 234, 106",
                    b: "212, 225, 55",
                    c: "249, 221, 39",
                    d: "250, 175, 63",
                    f: "254, 93, 19",
                    grey: "48, 42, 47",
                    low: "rgb(162, 234, 106)",
                    medium: "rgb(250, 175, 63)",
                    high: "rgb(254, 93, 19)",
                    "low-60": "rgb(162 234 106 / 60%)",
                    "medium-60": "rgb(250 175 63 / 60%)",
                    "high-60": "rgb(254 93 19 / 60%)",
                    "a-40": "rgba(162, 234, 106, 0.4)",
                    "b-40": "rgba(212, 225, 55, 0.4)",
                    "c-40": "rgba(249, 221, 39, 0.4)",
                    "d-40": "rgba(250, 175, 63, 0.4)",
                    "f-40": "rgba(254, 93, 19, 0.4)",
                    "na-40": "rgba(48, 42, 47, 0.4)",
                },
            },

            // iconSet: 'material-icons', // Quasar icon set
            // lang: 'en-US', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],

            // Quasar plugins
            plugins: ["Notify"],
        },

        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
        // sourceFiles: {
        //   rootComponent: 'src/App.vue',
        //   router: 'src/router/index',
        //   store: 'src/store/index',
        //   registerServiceWorker: 'src-pwa/register-service-worker',
        //   serviceWorker: 'src-pwa/custom-service-worker',
        //   pwaManifestFile: 'src-pwa/manifest.json',
        //   electronMain: 'src-electron/electron-main',
        //   electronPreload: 'src-electron/electron-preload'
        // },

        // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
        ssr: {
            // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
            // will mess up SSR

            // extendSSRWebserverConf (esbuildConf) {},
            // extendPackageJson (json) {},

            pwa: false,

            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            middlewares: [
                "render", // keep this as last one
            ],
        },

        // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: "generateSW", // or 'injectManifest'
            injectPwaMetaTags: true,
            swFilename: "sw.js",
            manifestFilename: "manifest.json",
            useCredentialsForManifestTag: false,
            // useFilenameHashes: true,
            // extendGenerateSWOptions (cfg) {}
            // extendInjectManifestOptions (cfg) {},
            // extendManifestJson (json) {}
            // extendPWACustomSWConf (esbuildConf) {}
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true,
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
        electron: {
            // extendElectronMainConf (esbuildConf)
            // extendElectronPreloadConf (esbuildConf)

            inspectPort: 5858,

            bundler: "packager", // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: "actyme",
            },
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
        bex: {
            contentScripts: ["my-content-script"],

            // extendBexScriptsConf (esbuildConf) {}
            // extendBexManifestJson (json) {}
        },
    };
});
