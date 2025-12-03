"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/snow/stagnant-stock/route";
exports.ids = ["app/api/snow/stagnant-stock/route"];
exports.modules = {

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:child_process":
/*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("node:stream/web");

/***/ }),

/***/ "node:string_decoder":
/*!**************************************!*\
  !*** external "node:string_decoder" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("node:string_decoder");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("perf_hooks");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&page=%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsnow%2Fstagnant-stock%2Froute.js&appDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&page=%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsnow%2Fstagnant-stock%2Froute.js&appDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_PC_Desktop_acc_accweekcover_251128_src_app_api_snow_stagnant_stock_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/snow/stagnant-stock/route.js */ \"(rsc)/./src/app/api/snow/stagnant-stock/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/snow/stagnant-stock/route\",\n        pathname: \"/api/snow/stagnant-stock\",\n        filename: \"route\",\n        bundlePath: \"app/api/snow/stagnant-stock/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\PC\\\\Desktop\\\\acc\\\\accweekcover_251128\\\\src\\\\app\\\\api\\\\snow\\\\stagnant-stock\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_PC_Desktop_acc_accweekcover_251128_src_app_api_snow_stagnant_stock_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/snow/stagnant-stock/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzbm93JTJGc3RhZ25hbnQtc3RvY2slMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNub3clMkZzdGFnbmFudC1zdG9jayUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNub3clMkZzdGFnbmFudC1zdG9jayUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNQQyU1Q0Rlc2t0b3AlNUNhY2MlNUNhY2N3ZWVrY292ZXJfMjUxMTI4JTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNQQyU1Q0Rlc2t0b3AlNUNhY2MlNUNhY2N3ZWVrY292ZXJfMjUxMTI4JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0M7QUFDNUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2Nlc3Nvcnktc2FsZXMtc3VtbWFyeS8/ZTFhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxQQ1xcXFxEZXNrdG9wXFxcXGFjY1xcXFxhY2N3ZWVrY292ZXJfMjUxMTI4XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHNub3dcXFxcc3RhZ25hbnQtc3RvY2tcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwic3RhbmRhbG9uZVwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zbm93L3N0YWduYW50LXN0b2NrL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc25vdy9zdGFnbmFudC1zdG9ja1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc25vdy9zdGFnbmFudC1zdG9jay9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFBDXFxcXERlc2t0b3BcXFxcYWNjXFxcXGFjY3dlZWtjb3Zlcl8yNTExMjhcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcc25vd1xcXFxzdGFnbmFudC1zdG9ja1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvc25vdy9zdGFnbmFudC1zdG9jay9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&page=%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsnow%2Fstagnant-stock%2Froute.js&appDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/snow/stagnant-stock/route.js":
/*!**************************************************!*\
  !*** ./src/app/api/snow/stagnant-stock/route.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nconst runtime = \"nodejs\";\nconst snowflake = __webpack_require__(/*! snowflake-sdk */ \"(rsc)/./node_modules/snowflake-sdk/dist/index.js\");\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const yyyymm = searchParams.get(\"yyyymm\") || \"202510\";\n    const brdCd = searchParams.get(\"brdCd\") || \"M\"; // M=MLB, I=MLB KIDS, X=DISCOVERY\n    const channel = searchParams.get(\"channel\") || \"ALL\"; // ALL, FR, OR\n    const connection = snowflake.createConnection({\n        account: process.env.SNOWFLAKE_ACCOUNT,\n        username: process.env.SNOWFLAKE_USERNAME,\n        password: process.env.SNOWFLAKE_PASSWORD,\n        warehouse: process.env.SNOWFLAKE_WAREHOUSE,\n        database: process.env.SNOWFLAKE_DATABASE,\n        schema: process.env.SNOWFLAKE_SCHEMA,\n        role: process.env.SNOWFLAKE_ROLE\n    });\n    return new Promise((resolve)=>{\n        connection.connect((err)=>{\n            if (err) {\n                console.error(\"Snowflake connection error:\", err);\n                resolve(next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: err.message\n                }, {\n                    status: 500\n                }));\n                return;\n            }\n            // USE DATABASE 문 제거하고 fully qualified name 사용\n            const sql = `\n        WITH PARAM AS (\n            SELECT 'CY'      AS DIV\n                 , '${yyyymm}'  AS STD_YYYYMM\n                 , '${brdCd}'       AS BRD_CD\n        )\n        , item AS (\n            SELECT  prdt_cd\n                  , sesn\n                  , CASE \n                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Headwear' THEN '모자'\n                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Shoes'    THEN '신발'\n                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Bag'      THEN '가방'\n                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Acc_etc'  THEN '기타'\n                    END AS item_std\n            FROM fnf.sap_fnf.mst_prdt\n            WHERE prdt_hrrc1_nm = 'ACC'\n        )\n        , item_seq AS (\n            SELECT '신발' AS item_std, 1 AS seq\n            UNION ALL SELECT '모자', 2\n            UNION ALL SELECT '가방', 3\n            UNION ALL SELECT '기타', 4\n        )\n        , SALE_1M AS (\n            SELECT  a.brd_cd\n                  , p.div\n                  , p.STD_YYYYMM            AS yyyymm\n                  , c.fr_or_cls             AS channel\n                  , a.prdt_cd\n                  , i.item_std\n                  , SUM(a.sale_amt)         AS sale_amt\n            FROM fnf.chn.dm_sh_s_m a\n            JOIN PARAM p\n              ON a.yymm   = p.STD_YYYYMM\n             AND a.brd_cd = p.BRD_CD\n            JOIN fnf.chn.dw_shop_wh_detail c\n              ON a.shop_id = c.oa_map_shop_id\n            JOIN item i\n              ON a.prdt_cd = i.prdt_cd\n            GROUP BY a.brd_cd, p.div, p.STD_YYYYMM, c.fr_or_cls, a.prdt_cd, i.item_std\n        )\n        , STOCK AS (\n            SELECT  a.brd_cd\n                  , p.div\n                  , p.STD_YYYYMM                  AS yyyymm\n                  , b.fr_or_cls                   AS channel\n                  , a.prdt_cd\n                  , i.item_std\n                  , SUM(a.STOCK_TAG_AMT_EXPECTED) AS end_stock_tag_amt\n            FROM fnf.chn.dw_stock_m a\n            JOIN fnf.chn.dw_shop_wh_detail b\n              ON a.shop_id = b.oa_map_shop_id\n            JOIN PARAM p\n              ON a.yymm   = p.STD_YYYYMM\n             AND a.brd_cd = p.BRD_CD\n            JOIN item i\n              ON a.PRDT_CD = i.PRDT_CD\n            GROUP BY a.brd_cd, p.div, p.STD_YYYYMM, b.fr_or_cls, a.prdt_cd, i.item_std\n        )\n        , BASE AS (\n            SELECT  \n                  a.yyyymm                  AS yyyymm\n                , a.brd_cd                  AS brd_cd\n                , a.channel                 AS channel\n                , i.item_std                AS item_std\n                , i.prdt_cd                 AS prdt_cd\n                , i.sesn                    AS sesn\n                , SUM(b.end_stock_tag_amt)  AS end_stock_tag_amt\n                , SUM(a.sale_amt)           AS sale_amt\n            FROM SALE_1M a\n            JOIN STOCK b\n              ON a.brd_cd   = b.brd_cd\n             AND a.div      = b.div\n             AND a.channel  = b.channel\n             AND a.prdt_cd  = b.prdt_cd\n             AND a.yyyymm   = b.yyyymm\n            JOIN item i\n              ON a.prdt_cd = i.prdt_cd\n            JOIN item_seq s\n              ON i.item_std = s.item_std\n            WHERE a.div = 'CY'\n            GROUP BY a.yyyymm, a.brd_cd, a.channel, i.item_std, s.seq, i.prdt_cd, i.sesn\n        )\n        , RATIO AS (\n            SELECT\n                  yyyymm\n                , brd_cd\n                , channel\n                , item_std\n                , prdt_cd\n                , sesn\n                , COALESCE(sale_amt, 0)          AS sale_amt\n                , end_stock_tag_amt\n                , SUM(end_stock_tag_amt) OVER (\n                      PARTITION BY yyyymm, brd_cd, channel, item_std\n                  ) AS mid_end_stock_amt\n            FROM BASE\n        )\n        SELECT\n              yyyymm\n            , brd_cd\n            , channel\n            , item_std\n            , prdt_cd\n            , sesn\n            , sale_amt\n            , end_stock_tag_amt\n            , mid_end_stock_amt\n            , CASE \n                WHEN mid_end_stock_amt = 0 THEN NULL\n                ELSE sale_amt / mid_end_stock_amt\n              END AS sale_ratio_mid_stock\n            , CASE \n                WHEN mid_end_stock_amt = 0 THEN '정상재고'\n                WHEN sale_amt / mid_end_stock_amt < 0.0001 THEN '정체재고'\n                ELSE '정상재고'\n              END AS stock_status\n        FROM RATIO\n        ORDER BY yyyymm, brd_cd, item_std, channel, prdt_cd\n      `;\n            connection.execute({\n                sqlText: sql,\n                complete: (err, stmt, rows)=>{\n                    if (err) {\n                        console.error(\"Snowflake query error:\", err);\n                        connection.destroy();\n                        resolve(next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                            error: err.message\n                        }, {\n                            status: 500\n                        }));\n                        return;\n                    }\n                    try {\n                        // 채널 필터링\n                        let filteredRows = rows || [];\n                        if (channel !== \"ALL\") {\n                            filteredRows = filteredRows.filter((row)=>row.CHANNEL === channel);\n                        }\n                        connection.destroy();\n                        resolve(next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                            data: filteredRows\n                        }));\n                    } catch (filterErr) {\n                        console.error(\"Filter error:\", filterErr);\n                        connection.destroy();\n                        resolve(next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                            error: filterErr.message\n                        }, {\n                            status: 500\n                        }));\n                    }\n                }\n            });\n        });\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9zbm93L3N0YWduYW50LXN0b2NrL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUVwQyxNQUFNQyxVQUFVLFNBQVM7QUFFaEMsTUFBTUMsWUFBWUMsbUJBQU9BLENBQUMsdUVBQWU7QUFFbEMsZUFBZUMsSUFBSUMsT0FBTztJQUMvQixNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7SUFDNUMsTUFBTUMsU0FBU0gsYUFBYUksR0FBRyxDQUFDLGFBQWE7SUFDN0MsTUFBTUMsUUFBUUwsYUFBYUksR0FBRyxDQUFDLFlBQVksS0FBSyxpQ0FBaUM7SUFDakYsTUFBTUUsVUFBVU4sYUFBYUksR0FBRyxDQUFDLGNBQWMsT0FBTyxjQUFjO0lBRXBFLE1BQU1HLGFBQWFYLFVBQVVZLGdCQUFnQixDQUFDO1FBQzVDQyxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQjtRQUN0Q0MsVUFBVUgsUUFBUUMsR0FBRyxDQUFDRyxrQkFBa0I7UUFDeENDLFVBQVVMLFFBQVFDLEdBQUcsQ0FBQ0ssa0JBQWtCO1FBQ3hDQyxXQUFXUCxRQUFRQyxHQUFHLENBQUNPLG1CQUFtQjtRQUMxQ0MsVUFBVVQsUUFBUUMsR0FBRyxDQUFDUyxrQkFBa0I7UUFDeENDLFFBQVFYLFFBQVFDLEdBQUcsQ0FBQ1csZ0JBQWdCO1FBQ3BDQyxNQUFNYixRQUFRQyxHQUFHLENBQUNhLGNBQWM7SUFDbEM7SUFFQSxPQUFPLElBQUlDLFFBQVEsQ0FBQ0M7UUFDbEJuQixXQUFXb0IsT0FBTyxDQUFDLENBQUNDO1lBQ2xCLElBQUlBLEtBQUs7Z0JBQ1BDLFFBQVFDLEtBQUssQ0FBQywrQkFBK0JGO2dCQUM3Q0YsUUFDRWhDLHFEQUFZQSxDQUFDcUMsSUFBSSxDQUFDO29CQUFFRCxPQUFPRixJQUFJSSxPQUFPO2dCQUFDLEdBQUc7b0JBQUVDLFFBQVE7Z0JBQUk7Z0JBRTFEO1lBQ0Y7WUFFQSw4Q0FBOEM7WUFDOUMsTUFBTUMsTUFBTSxDQUFDOzs7b0JBR0MsRUFBRS9CLE9BQU87b0JBQ1QsRUFBRUUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFvSHRCLENBQUM7WUFFREUsV0FBVzRCLE9BQU8sQ0FBQztnQkFDakJDLFNBQVNGO2dCQUNURyxVQUFVLENBQUNULEtBQUtVLE1BQU1DO29CQUNwQixJQUFJWCxLQUFLO3dCQUNQQyxRQUFRQyxLQUFLLENBQUMsMEJBQTBCRjt3QkFDeENyQixXQUFXaUMsT0FBTzt3QkFDbEJkLFFBQ0VoQyxxREFBWUEsQ0FBQ3FDLElBQUksQ0FBQzs0QkFBRUQsT0FBT0YsSUFBSUksT0FBTzt3QkFBQyxHQUFHOzRCQUFFQyxRQUFRO3dCQUFJO3dCQUUxRDtvQkFDRjtvQkFFQSxJQUFJO3dCQUNGLFNBQVM7d0JBQ1QsSUFBSVEsZUFBZUYsUUFBUSxFQUFFO3dCQUM3QixJQUFJakMsWUFBWSxPQUFPOzRCQUNyQm1DLGVBQWVBLGFBQWFDLE1BQU0sQ0FBQ0MsQ0FBQUEsTUFBT0EsSUFBSUMsT0FBTyxLQUFLdEM7d0JBQzVEO3dCQUNBQyxXQUFXaUMsT0FBTzt3QkFDbEJkLFFBQVFoQyxxREFBWUEsQ0FBQ3FDLElBQUksQ0FBQzs0QkFBRWMsTUFBTUo7d0JBQWE7b0JBQ2pELEVBQUUsT0FBT0ssV0FBVzt3QkFDbEJqQixRQUFRQyxLQUFLLENBQUMsaUJBQWlCZ0I7d0JBQy9CdkMsV0FBV2lDLE9BQU87d0JBQ2xCZCxRQUNFaEMscURBQVlBLENBQUNxQyxJQUFJLENBQUM7NEJBQUVELE9BQU9nQixVQUFVZCxPQUFPO3dCQUFDLEdBQUc7NEJBQUVDLFFBQVE7d0JBQUk7b0JBRWxFO2dCQUNGO1lBQ0Y7UUFDRjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2Nlc3Nvcnktc2FsZXMtc3VtbWFyeS8uL3NyYy9hcHAvYXBpL3Nub3cvc3RhZ25hbnQtc3RvY2svcm91dGUuanM/ODI5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xuXG5jb25zdCBzbm93Zmxha2UgPSByZXF1aXJlKFwic25vd2ZsYWtlLXNka1wiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0KSB7XG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgY29uc3QgeXl5eW1tID0gc2VhcmNoUGFyYW1zLmdldChcInl5eXltbVwiKSB8fCBcIjIwMjUxMFwiO1xuICBjb25zdCBicmRDZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJicmRDZFwiKSB8fCBcIk1cIjsgLy8gTT1NTEIsIEk9TUxCIEtJRFMsIFg9RElTQ09WRVJZXG4gIGNvbnN0IGNoYW5uZWwgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiY2hhbm5lbFwiKSB8fCBcIkFMTFwiOyAvLyBBTEwsIEZSLCBPUlxuXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBzbm93Zmxha2UuY3JlYXRlQ29ubmVjdGlvbih7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuU05PV0ZMQUtFX0FDQ09VTlQsXG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LlNOT1dGTEFLRV9VU0VSTkFNRSxcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuU05PV0ZMQUtFX1BBU1NXT1JELFxuICAgIHdhcmVob3VzZTogcHJvY2Vzcy5lbnYuU05PV0ZMQUtFX1dBUkVIT1VTRSxcbiAgICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuU05PV0ZMQUtFX0RBVEFCQVNFLFxuICAgIHNjaGVtYTogcHJvY2Vzcy5lbnYuU05PV0ZMQUtFX1NDSEVNQSxcbiAgICByb2xlOiBwcm9jZXNzLmVudi5TTk9XRkxBS0VfUk9MRSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29ubmVjdGlvbi5jb25uZWN0KChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNub3dmbGFrZSBjb25uZWN0aW9uIGVycm9yOlwiLCBlcnIpO1xuICAgICAgICByZXNvbHZlKFxuICAgICAgICAgIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBVU0UgREFUQUJBU0Ug66y4IOygnOqxsO2VmOqzoCBmdWxseSBxdWFsaWZpZWQgbmFtZSDsgqzsmqlcbiAgICAgIGNvbnN0IHNxbCA9IGBcbiAgICAgICAgV0lUSCBQQVJBTSBBUyAoXG4gICAgICAgICAgICBTRUxFQ1QgJ0NZJyAgICAgIEFTIERJVlxuICAgICAgICAgICAgICAgICAsICcke3l5eXltbX0nICBBUyBTVERfWVlZWU1NXG4gICAgICAgICAgICAgICAgICwgJyR7YnJkQ2R9JyAgICAgICBBUyBCUkRfQ0RcbiAgICAgICAgKVxuICAgICAgICAsIGl0ZW0gQVMgKFxuICAgICAgICAgICAgU0VMRUNUICBwcmR0X2NkXG4gICAgICAgICAgICAgICAgICAsIHNlc25cbiAgICAgICAgICAgICAgICAgICwgQ0FTRSBcbiAgICAgICAgICAgICAgICAgICAgICAgIFdIRU4gcHJkdF9ocnJjMV9ubSA9ICdBQ0MnIEFORCBwcmR0X2hycmMyX25tID0gJ0hlYWR3ZWFyJyBUSEVOICfrqqjsnpAnXG4gICAgICAgICAgICAgICAgICAgICAgICBXSEVOIHByZHRfaHJyYzFfbm0gPSAnQUNDJyBBTkQgcHJkdF9ocnJjMl9ubSA9ICdTaG9lcycgICAgVEhFTiAn7Iug67CcJ1xuICAgICAgICAgICAgICAgICAgICAgICAgV0hFTiBwcmR0X2hycmMxX25tID0gJ0FDQycgQU5EIHByZHRfaHJyYzJfbm0gPSAnQmFnJyAgICAgIFRIRU4gJ+qwgOuwqSdcbiAgICAgICAgICAgICAgICAgICAgICAgIFdIRU4gcHJkdF9ocnJjMV9ubSA9ICdBQ0MnIEFORCBwcmR0X2hycmMyX25tID0gJ0FjY19ldGMnICBUSEVOICfquLDtg4AnXG4gICAgICAgICAgICAgICAgICAgIEVORCBBUyBpdGVtX3N0ZFxuICAgICAgICAgICAgRlJPTSBmbmYuc2FwX2ZuZi5tc3RfcHJkdFxuICAgICAgICAgICAgV0hFUkUgcHJkdF9ocnJjMV9ubSA9ICdBQ0MnXG4gICAgICAgIClcbiAgICAgICAgLCBpdGVtX3NlcSBBUyAoXG4gICAgICAgICAgICBTRUxFQ1QgJ+yLoOuwnCcgQVMgaXRlbV9zdGQsIDEgQVMgc2VxXG4gICAgICAgICAgICBVTklPTiBBTEwgU0VMRUNUICfrqqjsnpAnLCAyXG4gICAgICAgICAgICBVTklPTiBBTEwgU0VMRUNUICfqsIDrsKknLCAzXG4gICAgICAgICAgICBVTklPTiBBTEwgU0VMRUNUICfquLDtg4AnLCA0XG4gICAgICAgIClcbiAgICAgICAgLCBTQUxFXzFNIEFTIChcbiAgICAgICAgICAgIFNFTEVDVCAgYS5icmRfY2RcbiAgICAgICAgICAgICAgICAgICwgcC5kaXZcbiAgICAgICAgICAgICAgICAgICwgcC5TVERfWVlZWU1NICAgICAgICAgICAgQVMgeXl5eW1tXG4gICAgICAgICAgICAgICAgICAsIGMuZnJfb3JfY2xzICAgICAgICAgICAgIEFTIGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICwgYS5wcmR0X2NkXG4gICAgICAgICAgICAgICAgICAsIGkuaXRlbV9zdGRcbiAgICAgICAgICAgICAgICAgICwgU1VNKGEuc2FsZV9hbXQpICAgICAgICAgQVMgc2FsZV9hbXRcbiAgICAgICAgICAgIEZST00gZm5mLmNobi5kbV9zaF9zX20gYVxuICAgICAgICAgICAgSk9JTiBQQVJBTSBwXG4gICAgICAgICAgICAgIE9OIGEueXltbSAgID0gcC5TVERfWVlZWU1NXG4gICAgICAgICAgICAgQU5EIGEuYnJkX2NkID0gcC5CUkRfQ0RcbiAgICAgICAgICAgIEpPSU4gZm5mLmNobi5kd19zaG9wX3doX2RldGFpbCBjXG4gICAgICAgICAgICAgIE9OIGEuc2hvcF9pZCA9IGMub2FfbWFwX3Nob3BfaWRcbiAgICAgICAgICAgIEpPSU4gaXRlbSBpXG4gICAgICAgICAgICAgIE9OIGEucHJkdF9jZCA9IGkucHJkdF9jZFxuICAgICAgICAgICAgR1JPVVAgQlkgYS5icmRfY2QsIHAuZGl2LCBwLlNURF9ZWVlZTU0sIGMuZnJfb3JfY2xzLCBhLnByZHRfY2QsIGkuaXRlbV9zdGRcbiAgICAgICAgKVxuICAgICAgICAsIFNUT0NLIEFTIChcbiAgICAgICAgICAgIFNFTEVDVCAgYS5icmRfY2RcbiAgICAgICAgICAgICAgICAgICwgcC5kaXZcbiAgICAgICAgICAgICAgICAgICwgcC5TVERfWVlZWU1NICAgICAgICAgICAgICAgICAgQVMgeXl5eW1tXG4gICAgICAgICAgICAgICAgICAsIGIuZnJfb3JfY2xzICAgICAgICAgICAgICAgICAgIEFTIGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICwgYS5wcmR0X2NkXG4gICAgICAgICAgICAgICAgICAsIGkuaXRlbV9zdGRcbiAgICAgICAgICAgICAgICAgICwgU1VNKGEuU1RPQ0tfVEFHX0FNVF9FWFBFQ1RFRCkgQVMgZW5kX3N0b2NrX3RhZ19hbXRcbiAgICAgICAgICAgIEZST00gZm5mLmNobi5kd19zdG9ja19tIGFcbiAgICAgICAgICAgIEpPSU4gZm5mLmNobi5kd19zaG9wX3doX2RldGFpbCBiXG4gICAgICAgICAgICAgIE9OIGEuc2hvcF9pZCA9IGIub2FfbWFwX3Nob3BfaWRcbiAgICAgICAgICAgIEpPSU4gUEFSQU0gcFxuICAgICAgICAgICAgICBPTiBhLnl5bW0gICA9IHAuU1REX1lZWVlNTVxuICAgICAgICAgICAgIEFORCBhLmJyZF9jZCA9IHAuQlJEX0NEXG4gICAgICAgICAgICBKT0lOIGl0ZW0gaVxuICAgICAgICAgICAgICBPTiBhLlBSRFRfQ0QgPSBpLlBSRFRfQ0RcbiAgICAgICAgICAgIEdST1VQIEJZIGEuYnJkX2NkLCBwLmRpdiwgcC5TVERfWVlZWU1NLCBiLmZyX29yX2NscywgYS5wcmR0X2NkLCBpLml0ZW1fc3RkXG4gICAgICAgIClcbiAgICAgICAgLCBCQVNFIEFTIChcbiAgICAgICAgICAgIFNFTEVDVCAgXG4gICAgICAgICAgICAgICAgICBhLnl5eXltbSAgICAgICAgICAgICAgICAgIEFTIHl5eXltbVxuICAgICAgICAgICAgICAgICwgYS5icmRfY2QgICAgICAgICAgICAgICAgICBBUyBicmRfY2RcbiAgICAgICAgICAgICAgICAsIGEuY2hhbm5lbCAgICAgICAgICAgICAgICAgQVMgY2hhbm5lbFxuICAgICAgICAgICAgICAgICwgaS5pdGVtX3N0ZCAgICAgICAgICAgICAgICBBUyBpdGVtX3N0ZFxuICAgICAgICAgICAgICAgICwgaS5wcmR0X2NkICAgICAgICAgICAgICAgICBBUyBwcmR0X2NkXG4gICAgICAgICAgICAgICAgLCBpLnNlc24gICAgICAgICAgICAgICAgICAgIEFTIHNlc25cbiAgICAgICAgICAgICAgICAsIFNVTShiLmVuZF9zdG9ja190YWdfYW10KSAgQVMgZW5kX3N0b2NrX3RhZ19hbXRcbiAgICAgICAgICAgICAgICAsIFNVTShhLnNhbGVfYW10KSAgICAgICAgICAgQVMgc2FsZV9hbXRcbiAgICAgICAgICAgIEZST00gU0FMRV8xTSBhXG4gICAgICAgICAgICBKT0lOIFNUT0NLIGJcbiAgICAgICAgICAgICAgT04gYS5icmRfY2QgICA9IGIuYnJkX2NkXG4gICAgICAgICAgICAgQU5EIGEuZGl2ICAgICAgPSBiLmRpdlxuICAgICAgICAgICAgIEFORCBhLmNoYW5uZWwgID0gYi5jaGFubmVsXG4gICAgICAgICAgICAgQU5EIGEucHJkdF9jZCAgPSBiLnByZHRfY2RcbiAgICAgICAgICAgICBBTkQgYS55eXl5bW0gICA9IGIueXl5eW1tXG4gICAgICAgICAgICBKT0lOIGl0ZW0gaVxuICAgICAgICAgICAgICBPTiBhLnByZHRfY2QgPSBpLnByZHRfY2RcbiAgICAgICAgICAgIEpPSU4gaXRlbV9zZXEgc1xuICAgICAgICAgICAgICBPTiBpLml0ZW1fc3RkID0gcy5pdGVtX3N0ZFxuICAgICAgICAgICAgV0hFUkUgYS5kaXYgPSAnQ1knXG4gICAgICAgICAgICBHUk9VUCBCWSBhLnl5eXltbSwgYS5icmRfY2QsIGEuY2hhbm5lbCwgaS5pdGVtX3N0ZCwgcy5zZXEsIGkucHJkdF9jZCwgaS5zZXNuXG4gICAgICAgIClcbiAgICAgICAgLCBSQVRJTyBBUyAoXG4gICAgICAgICAgICBTRUxFQ1RcbiAgICAgICAgICAgICAgICAgIHl5eXltbVxuICAgICAgICAgICAgICAgICwgYnJkX2NkXG4gICAgICAgICAgICAgICAgLCBjaGFubmVsXG4gICAgICAgICAgICAgICAgLCBpdGVtX3N0ZFxuICAgICAgICAgICAgICAgICwgcHJkdF9jZFxuICAgICAgICAgICAgICAgICwgc2VzblxuICAgICAgICAgICAgICAgICwgQ09BTEVTQ0Uoc2FsZV9hbXQsIDApICAgICAgICAgIEFTIHNhbGVfYW10XG4gICAgICAgICAgICAgICAgLCBlbmRfc3RvY2tfdGFnX2FtdFxuICAgICAgICAgICAgICAgICwgU1VNKGVuZF9zdG9ja190YWdfYW10KSBPVkVSIChcbiAgICAgICAgICAgICAgICAgICAgICBQQVJUSVRJT04gQlkgeXl5eW1tLCBicmRfY2QsIGNoYW5uZWwsIGl0ZW1fc3RkXG4gICAgICAgICAgICAgICAgICApIEFTIG1pZF9lbmRfc3RvY2tfYW10XG4gICAgICAgICAgICBGUk9NIEJBU0VcbiAgICAgICAgKVxuICAgICAgICBTRUxFQ1RcbiAgICAgICAgICAgICAgeXl5eW1tXG4gICAgICAgICAgICAsIGJyZF9jZFxuICAgICAgICAgICAgLCBjaGFubmVsXG4gICAgICAgICAgICAsIGl0ZW1fc3RkXG4gICAgICAgICAgICAsIHByZHRfY2RcbiAgICAgICAgICAgICwgc2VzblxuICAgICAgICAgICAgLCBzYWxlX2FtdFxuICAgICAgICAgICAgLCBlbmRfc3RvY2tfdGFnX2FtdFxuICAgICAgICAgICAgLCBtaWRfZW5kX3N0b2NrX2FtdFxuICAgICAgICAgICAgLCBDQVNFIFxuICAgICAgICAgICAgICAgIFdIRU4gbWlkX2VuZF9zdG9ja19hbXQgPSAwIFRIRU4gTlVMTFxuICAgICAgICAgICAgICAgIEVMU0Ugc2FsZV9hbXQgLyBtaWRfZW5kX3N0b2NrX2FtdFxuICAgICAgICAgICAgICBFTkQgQVMgc2FsZV9yYXRpb19taWRfc3RvY2tcbiAgICAgICAgICAgICwgQ0FTRSBcbiAgICAgICAgICAgICAgICBXSEVOIG1pZF9lbmRfc3RvY2tfYW10ID0gMCBUSEVOICfsoJXsg4Hsnqzqs6AnXG4gICAgICAgICAgICAgICAgV0hFTiBzYWxlX2FtdCAvIG1pZF9lbmRfc3RvY2tfYW10IDwgMC4wMDAxIFRIRU4gJ+ygleyytOyerOqzoCdcbiAgICAgICAgICAgICAgICBFTFNFICfsoJXsg4Hsnqzqs6AnXG4gICAgICAgICAgICAgIEVORCBBUyBzdG9ja19zdGF0dXNcbiAgICAgICAgRlJPTSBSQVRJT1xuICAgICAgICBPUkRFUiBCWSB5eXl5bW0sIGJyZF9jZCwgaXRlbV9zdGQsIGNoYW5uZWwsIHByZHRfY2RcbiAgICAgIGA7XG5cbiAgICAgIGNvbm5lY3Rpb24uZXhlY3V0ZSh7XG4gICAgICAgIHNxbFRleHQ6IHNxbCxcbiAgICAgICAgY29tcGxldGU6IChlcnIsIHN0bXQsIHJvd3MpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU25vd2ZsYWtlIHF1ZXJ5IGVycm9yOlwiLCBlcnIpO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgICBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnIubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g7LGE64SQIO2VhO2EsOungVxuICAgICAgICAgICAgbGV0IGZpbHRlcmVkUm93cyA9IHJvd3MgfHwgW107XG4gICAgICAgICAgICBpZiAoY2hhbm5lbCAhPT0gXCJBTExcIikge1xuICAgICAgICAgICAgICBmaWx0ZXJlZFJvd3MgPSBmaWx0ZXJlZFJvd3MuZmlsdGVyKHJvdyA9PiByb3cuQ0hBTk5FTCA9PT0gY2hhbm5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25uZWN0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJlc29sdmUoTmV4dFJlc3BvbnNlLmpzb24oeyBkYXRhOiBmaWx0ZXJlZFJvd3MgfSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGZpbHRlckVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZpbHRlciBlcnJvcjpcIiwgZmlsdGVyRXJyKTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZGVzdHJveSgpO1xuICAgICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICAgTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZmlsdGVyRXJyLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicnVudGltZSIsInNub3dmbGFrZSIsInJlcXVpcmUiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwieXl5eW1tIiwiZ2V0IiwiYnJkQ2QiLCJjaGFubmVsIiwiY29ubmVjdGlvbiIsImNyZWF0ZUNvbm5lY3Rpb24iLCJhY2NvdW50IiwicHJvY2VzcyIsImVudiIsIlNOT1dGTEFLRV9BQ0NPVU5UIiwidXNlcm5hbWUiLCJTTk9XRkxBS0VfVVNFUk5BTUUiLCJwYXNzd29yZCIsIlNOT1dGTEFLRV9QQVNTV09SRCIsIndhcmVob3VzZSIsIlNOT1dGTEFLRV9XQVJFSE9VU0UiLCJkYXRhYmFzZSIsIlNOT1dGTEFLRV9EQVRBQkFTRSIsInNjaGVtYSIsIlNOT1dGTEFLRV9TQ0hFTUEiLCJyb2xlIiwiU05PV0ZMQUtFX1JPTEUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNvbm5lY3QiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJqc29uIiwibWVzc2FnZSIsInN0YXR1cyIsInNxbCIsImV4ZWN1dGUiLCJzcWxUZXh0IiwiY29tcGxldGUiLCJzdG10Iiwicm93cyIsImRlc3Ryb3kiLCJmaWx0ZXJlZFJvd3MiLCJmaWx0ZXIiLCJyb3ciLCJDSEFOTkVMIiwiZGF0YSIsImZpbHRlckVyciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/snow/stagnant-stock/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@aws-sdk","vendor-chunks/@smithy","vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/gtoken","vendor-chunks/gcp-metadata","vendor-chunks/@azure","vendor-chunks/@typespec","vendor-chunks/snowflake-sdk","vendor-chunks/@google-cloud","vendor-chunks/semver","vendor-chunks/teeny-request","vendor-chunks/gaxios","vendor-chunks/async","vendor-chunks/logform","vendor-chunks/generic-pool","vendor-chunks/winston","vendor-chunks/jsonwebtoken","vendor-chunks/uuid","vendor-chunks/readable-stream","vendor-chunks/glob","vendor-chunks/asn1.js","vendor-chunks/fast-xml-parser","vendor-chunks/@colors","vendor-chunks/asynckit","vendor-chunks/@techteamer","vendor-chunks/@aws-crypto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/@dabh","vendor-chunks/whatwg-url","vendor-chunks/triple-beam","vendor-chunks/jws","vendor-chunks/call-bind-apply-helpers","vendor-chunks/html-entities","vendor-chunks/mime","vendor-chunks/debug","vendor-chunks/winston-transport","vendor-chunks/toml","vendor-chunks/retry","vendor-chunks/moment-timezone","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/get-proto","vendor-chunks/tr46","vendor-chunks/simple-lru-cache","vendor-chunks/mime-db","vendor-chunks/inherits","vendor-chunks/https-proxy-agent","vendor-chunks/homedir-polyfill","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/tslib","vendor-chunks/node-fetch","vendor-chunks/path-scurry","vendor-chunks/minipass","vendor-chunks/lru-cache","vendor-chunks/axios","vendor-chunks/yocto-queue","vendor-chunks/wrappy","vendor-chunks/webidl-conversions","vendor-chunks/util-deprecate","vendor-chunks/supports-color","vendor-chunks/stubs","vendor-chunks/strnum","vendor-chunks/string_decoder","vendor-chunks/stream-shift","vendor-chunks/stream-events","vendor-chunks/stack-trace","vendor-chunks/safer-buffer","vendor-chunks/safe-stable-stringify","vendor-chunks/safe-buffer","vendor-chunks/retry-request","vendor-chunks/proxy-from-env","vendor-chunks/parse-passwd","vendor-chunks/p-limit","vendor-chunks/open","vendor-chunks/one-time","vendor-chunks/once","vendor-chunks/ms","vendor-chunks/moment","vendor-chunks/minimalistic-assert","vendor-chunks/mime-types","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/kuler","vendor-chunks/jwa","vendor-chunks/is-wsl","vendor-chunks/is-stream","vendor-chunks/is-docker","vendor-chunks/http-proxy-agent","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/fn.name","vendor-chunks/fecha","vendor-chunks/fastest-levenshtein","vendor-chunks/extend","vendor-chunks/expand-tilde","vendor-chunks/event-target-shim","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/end-of-stream","vendor-chunks/enabled","vendor-chunks/duplexify","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bn.js","vendor-chunks/bignumber.js","vendor-chunks/big-integer","vendor-chunks/base64-js","vendor-chunks/balanced-match","vendor-chunks/async-retry","vendor-chunks/asn1.js-rfc5280","vendor-chunks/asn1.js-rfc2560","vendor-chunks/arrify","vendor-chunks/abort-controller","vendor-chunks/@tootallnate","vendor-chunks/@so-ric","vendor-chunks/@aws"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&page=%2Fapi%2Fsnow%2Fstagnant-stock%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsnow%2Fstagnant-stock%2Froute.js&appDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CPC%5CDesktop%5Cacc%5Caccweekcover_251128&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();