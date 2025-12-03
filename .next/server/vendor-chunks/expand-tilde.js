/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/expand-tilde";
exports.ids = ["vendor-chunks/expand-tilde"];
exports.modules = {

/***/ "(rsc)/./node_modules/expand-tilde/index.js":
/*!********************************************!*\
  !*** ./node_modules/expand-tilde/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * expand-tilde <https://github.com/jonschlinkert/expand-tilde>\n *\n * Copyright (c) 2015 Jon Schlinkert.\n * Licensed under the MIT license.\n */\n\nvar homedir = __webpack_require__(/*! homedir-polyfill */ \"(rsc)/./node_modules/homedir-polyfill/index.js\");\nvar path = __webpack_require__(/*! path */ \"path\");\n\nmodule.exports = function expandTilde(filepath) {\n  var home = homedir();\n\n  if (filepath.charCodeAt(0) === 126 /* ~ */) {\n    if (filepath.charCodeAt(1) === 43 /* + */) {\n      return path.join(process.cwd(), filepath.slice(2));\n    }\n    return home ? path.join(home, filepath.slice(1)) : filepath;\n  }\n\n  return filepath;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZXhwYW5kLXRpbGRlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsd0VBQWtCO0FBQ3hDLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjY2Vzc29yeS1zYWxlcy1zdW1tYXJ5Ly4vbm9kZV9tb2R1bGVzL2V4cGFuZC10aWxkZS9pbmRleC5qcz9kNjlmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogZXhwYW5kLXRpbGRlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9leHBhbmQtdGlsZGU+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbnZhciBob21lZGlyID0gcmVxdWlyZSgnaG9tZWRpci1wb2x5ZmlsbCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXhwYW5kVGlsZGUoZmlsZXBhdGgpIHtcbiAgdmFyIGhvbWUgPSBob21lZGlyKCk7XG5cbiAgaWYgKGZpbGVwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDEyNiAvKiB+ICovKSB7XG4gICAgaWYgKGZpbGVwYXRoLmNoYXJDb2RlQXQoMSkgPT09IDQzIC8qICsgKi8pIHtcbiAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgZmlsZXBhdGguc2xpY2UoMikpO1xuICAgIH1cbiAgICByZXR1cm4gaG9tZSA/IHBhdGguam9pbihob21lLCBmaWxlcGF0aC5zbGljZSgxKSkgOiBmaWxlcGF0aDtcbiAgfVxuXG4gIHJldHVybiBmaWxlcGF0aDtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/expand-tilde/index.js\n");

/***/ })

};
;