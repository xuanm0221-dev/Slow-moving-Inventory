"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-wsl";
exports.ids = ["vendor-chunks/is-wsl"];
exports.modules = {

/***/ "(rsc)/./node_modules/is-wsl/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-wsl/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst os = __webpack_require__(/*! os */ \"os\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst isDocker = __webpack_require__(/*! is-docker */ \"(rsc)/./node_modules/is-docker/index.js\");\n\nconst isWsl = () => {\n\tif (process.platform !== 'linux') {\n\t\treturn false;\n\t}\n\n\tif (os.release().toLowerCase().includes('microsoft')) {\n\t\tif (isDocker()) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\ttry {\n\t\treturn fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?\n\t\t\t!isDocker() : false;\n\t} catch (_) {\n\t\treturn false;\n\t}\n};\n\nif (process.env.__IS_WSL_TEST__) {\n\tmodule.exports = isWsl;\n} else {\n\tmodule.exports = isWsl();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXMtd3NsL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsV0FBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkIsV0FBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkIsaUJBQWlCLG1CQUFPLENBQUMsMERBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2Nlc3Nvcnktc2FsZXMtc3VtbWFyeS8uL25vZGVfbW9kdWxlcy9pcy13c2wvaW5kZXguanM/NTYxZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBpc0RvY2tlciA9IHJlcXVpcmUoJ2lzLWRvY2tlcicpO1xuXG5jb25zdCBpc1dzbCA9ICgpID0+IHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdsaW51eCcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAob3MucmVsZWFzZSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ21pY3Jvc29mdCcpKSB7XG5cdFx0aWYgKGlzRG9ja2VyKCkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0cmV0dXJuIGZzLnJlYWRGaWxlU3luYygnL3Byb2MvdmVyc2lvbicsICd1dGY4JykudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnbWljcm9zb2Z0JykgP1xuXHRcdFx0IWlzRG9ja2VyKCkgOiBmYWxzZTtcblx0fSBjYXRjaCAoXykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxuaWYgKHByb2Nlc3MuZW52Ll9fSVNfV1NMX1RFU1RfXykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGlzV3NsO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBpc1dzbCgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/is-wsl/index.js\n");

/***/ })

};
;