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
  !*** ./lib/simple-prettier-atom.js + 3 modules ***!
  \*************************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with external "atom" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "fs" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "import-from" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "path" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "pify" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "pkg-up" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "semver" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "atom"
var external_atom_ = __webpack_require__("atom");

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// CONCATENATED MODULE: ./lib/check-whether-to-format-file.js
//---------//
// Imports //
//---------//
 //
//------//
// Init //
//------//

const setOfUnsupportedParsers = new Set(['vue']); //
//------//
// Main //
//------//

const checkWhetherToFormatFile = (filepath, prettier) => {
  return prettier.resolveConfigFile(filepath).then(configFilepath => {
    if (!configFilepath) return;
    const ignorePath = getPrettierIgnorePath(configFilepath);
    return Promise.all([configFilepath, prettier.getFileInfo(filepath, {
      ignorePath
    })]);
  }).then(result => {
    if (!result) return false;
    const [configFilepath, fileInfo] = result;
    return !!(configFilepath && !fileInfo.ignored && fileInfo.inferredParser && !setOfUnsupportedParsers.has(fileInfo.inferredParser));
  });
};

function getPrettierIgnorePath(configFilepath) {
  const configDir = external_path_default.a.dirname(configFilepath);
  return external_path_default.a.join(configDir, '.prettierignore');
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var check_whether_to_format_file = (checkWhetherToFormatFile);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__("fs");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: external "import-from"
var external_import_from_ = __webpack_require__("import-from");
var external_import_from_default = /*#__PURE__*/__webpack_require__.n(external_import_from_);

// EXTERNAL MODULE: external "pify"
var external_pify_ = __webpack_require__("pify");
var external_pify_default = /*#__PURE__*/__webpack_require__.n(external_pify_);

// EXTERNAL MODULE: external "pkg-up"
var external_pkg_up_ = __webpack_require__("pkg-up");
var external_pkg_up_default = /*#__PURE__*/__webpack_require__.n(external_pkg_up_);

// EXTERNAL MODULE: external "semver"
var external_semver_ = __webpack_require__("semver");
var external_semver_default = /*#__PURE__*/__webpack_require__.n(external_semver_);

// CONCATENATED MODULE: ./lib/maybe-find-local-prettier-instance.js
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const minimumSupportedPrettierVersion = '1.13.0'; //
//------//
// Main //
//------//

const maybeFindLocalPrettierInstance = filepath => {
  if (!filepath) return Promise.resolve();
  return external_pkg_up_default()(external_path_default.a.dirname(filepath)).then(packageJsonFilepath => {
    return packageJsonFilepath ? Promise.all([readFile(packageJsonFilepath), packageJsonFilepath]) : undefined;
  }).then(result => {
    if (!result) return;
    const [packageJsonContent, packageJsonFilepath] = result,
          json = tryParseJson(packageJsonContent);
    if (!json) return;
    const {
      dependencies = {},
      devDependencies = {}
    } = json;
    if (!(dependencies.prettier || devDependencies.prettier)) return;
    const packageJsonDir = external_path_default.a.dirname(packageJsonFilepath);

    try {
      const prettier = external_import_from_default()(packageJsonDir, 'prettier');
      return external_semver_default.a.gte(prettier.version, minimumSupportedPrettierVersion) ? prettier : undefined;
    } catch (_unused_error) {
      return;
    }
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function readFile(filepath) {
  return external_pify_default()(external_fs_default.a.readFile)(filepath, 'utf8');
}

function tryParseJson(string) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return false;
  }
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var maybe_find_local_prettier_instance = (maybeFindLocalPrettierInstance);
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
        filepath = buffer.getPath();
  return maybe_find_local_prettier_instance(filepath).then(prettier => {
    if (!prettier) return;
    return Promise.all([check_whether_to_format_file(filepath, prettier), prettier]);
  }).then(result => {
    if (!result) return;
    const [shouldFormatFile, prettier] = result;
    if (!shouldFormatFile) return;
    return Promise.all([prettier.resolveConfig(filepath), prettier]);
  }).then(result => {
    if (!result) return;
    const [config, prettier] = result;
    let formatResult;

    try {
      formatResult = prettier.formatWithCursor(buffer.getText(), Object.assign(config, {
        cursorOffset,
        filepath
      }));
    } // TODO: add option to log formatting errors to console
    catch (_unused_formattingError) {
      // if we can't format the code then there ain't nothin else to do!
      return;
    }

    const {
      formatted,
      cursorOffset: updatedCursorOffset
    } = formatResult;
    buffer.setText(formatted);
    const newPosition = buffer.positionForCharacterIndex(updatedCursorOffset);
    editor.setCursorBufferPosition(newPosition);
  }).catch(error => {
    /* eslint-disable no-console */
    console.error("The following unexpected error occurred in 'simple-prettier-atom'\n\nIf this package is up to date, please file an issue in the github repo\n  with the error contents so I can make sure to handle it\n  appropriately.\n\nSorry for the hassle and I appreciate your patience");
    console.error(error);
    /* eslint-enable no-console */
  });
}; //
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
// Init //
//------//

const setOfBuffers = new Set(); //
//------//
// Main //
//------//

/* harmony default export */ var simple_prettier_atom = __webpack_exports__["default"] = ({
  activate() {
    this.disposables = new external_atom_["CompositeDisposable"](atom.commands.add('atom-workspace', {
      'simple-prettier-atom:format': maybe_format
    }), atom.workspace.observeTextEditors(editor => {
      const buffer = editor.getBuffer();
      if (setOfBuffers.has(buffer)) return;
      setOfBuffers.add(buffer);
      const disposable = buffer.onWillSave(maybe_format);
      buffer.onDidDestroy(() => {
        disposable.dispose();
        setOfBuffers.delete(buffer);
      });
    }));
  },

  deactivate() {
    this.disposables.dispose();
  }

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "import-from":
/*!******************************!*\
  !*** external "import-from" ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("import-from");

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

/***/ "pify":
/*!***********************!*\
  !*** external "pify" ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("pify");

/***/ }),

/***/ "pkg-up":
/*!*************************!*\
  !*** external "pkg-up" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("pkg-up");

/***/ }),

/***/ "semver":
/*!*************************!*\
  !*** external "semver" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("semver");

/***/ })

/******/ })["default"];
//# sourceMappingURL=index.bundle.js.map