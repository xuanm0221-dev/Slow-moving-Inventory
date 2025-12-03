"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-docker";
exports.ids = ["vendor-chunks/is-docker"];
exports.modules = {

/***/ "(rsc)/./node_modules/is-docker/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-docker/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nlet isDocker;\n\nfunction hasDockerEnv() {\n\ttry {\n\t\tfs.statSync('/.dockerenv');\n\t\treturn true;\n\t} catch (_) {\n\t\treturn false;\n\t}\n}\n\nfunction hasDockerCGroup() {\n\ttry {\n\t\treturn fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');\n\t} catch (_) {\n\t\treturn false;\n\t}\n}\n\nmodule.exports = () => {\n\tif (isDocker === undefined) {\n\t\tisDocker = hasDockerEnv() || hasDockerCGroup();\n\t}\n\n\treturn isDocker;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXMtZG9ja2VyL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsV0FBVyxtQkFBTyxDQUFDLGNBQUk7O0FBRXZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2Nlc3Nvcnktc2FsZXMtc3VtbWFyeS8uL25vZGVfbW9kdWxlcy9pcy1kb2NrZXIvaW5kZXguanM/NmJmZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmxldCBpc0RvY2tlcjtcblxuZnVuY3Rpb24gaGFzRG9ja2VyRW52KCkge1xuXHR0cnkge1xuXHRcdGZzLnN0YXRTeW5jKCcvLmRvY2tlcmVudicpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGhhc0RvY2tlckNHcm91cCgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKCcvcHJvYy9zZWxmL2Nncm91cCcsICd1dGY4JykuaW5jbHVkZXMoJ2RvY2tlcicpO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXHRpZiAoaXNEb2NrZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdGlzRG9ja2VyID0gaGFzRG9ja2VyRW52KCkgfHwgaGFzRG9ja2VyQ0dyb3VwKCk7XG5cdH1cblxuXHRyZXR1cm4gaXNEb2NrZXI7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/is-docker/index.js\n");

/***/ })

};
;