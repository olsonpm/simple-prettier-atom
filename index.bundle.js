module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/simple-prettier-atom.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/simple-prettier-atom.js":
/*!*************************************************!*\
  !*** ./lib/simple-prettier-atom.js + 1 modules ***!
  \*************************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with external "atom" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "path" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "prettier" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "atom"
var external_atom_ = __webpack_require__("atom");

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: external "prettier"
var external_prettier_ = __webpack_require__("prettier");
var external_prettier_default = /*#__PURE__*/__webpack_require__.n(external_prettier_);

// CONCATENATED MODULE: ./lib/maybe-format.js
//---------//
// Imports //
//---------//




//
//------//
// Main //
//------//

const maybeFormat = () => {
  const editor = atom.workspace.getActiveTextEditor(),
    buffer = editor.getBuffer(),
    position = editor.getCursorBufferPosition(),
    cursorOffset = buffer.characterIndexForPosition(position),
    filepath = buffer.getPath()

  return Promise.all([
    external_prettier_default.a.resolveConfig(filepath),
    external_prettier_default.a.resolveConfigFile(filepath),
  ]).then(([config, configFilepath]) => {
    if (!configFilepath) return [config]

    const ignorePath = getPrettierIgnorePath(configFilepath)
    return Promise.all([
      config,
      configFilepath,
      external_prettier_default.a.getFileInfo(filepath, { ignorePath })
    ])
  })
  .then(([config, configFilepath, fileInfo]) => {
    if (!configFilepath || fileInfo.ignored || !fileInfo.inferredParser) return

    const { formatted, cursorOffset: updatedCursorOffset } = external_prettier_default.a.formatWithCursor(
      buffer.getText(),
      Object.assign(config, {
        cursorOffset,
        filepath,
      })
    )

    buffer.setText(formatted)
    const newPosition = buffer.positionForCharacterIndex(updatedCursorOffset)
    editor.setCursorBufferPosition(newPosition)
  })
}

//
//------------------//
// Helper Functions //
//------------------//

function getPrettierIgnorePath(configFilepath) {
  const configDir = external_path_default.a.dirname(configFilepath)
  return external_path_default.a.join(configDir, '.prettierignore')
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var maybe_format = (maybeFormat);

// CONCATENATED MODULE: ./lib/simple-prettier-atom.js
//---------//
// Imports //
//---------//





//
//------//
// Main //
//------//

/* harmony default export */ var simple_prettier_atom = __webpack_exports__["default"] = ({
  activate() {
    const buffer = atom.workspace.getActiveTextEditor().getBuffer()

    this.disposables = new external_atom_["CompositeDisposable"](
      atom.commands.add('atom-workspace', {
        'simple-prettier-atom:format': maybe_format,
      }),

      buffer.onWillSave(maybe_format)
    )
  },

  deactivate() {
    this.disposables.dispose()
  },
});


/***/ }),

/***/ "atom":
/*!***********************!*\
  !*** external "atom" ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("atom");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "prettier":
/*!***************************!*\
  !*** external "prettier" ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("prettier");

/***/ })

/******/ })["default"];
//# sourceMappingURL=index.bundle.js.map