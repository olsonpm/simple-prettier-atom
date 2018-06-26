//---------//
// Imports //
//---------//

import fs from 'fs'
import importFrom from 'import-from'
import path from 'path'
import pify from 'pify'
import pkgUp from 'pkg-up'
import semver from 'semver'

//
//------//
// Init //
//------//

const minimumSupportedPrettierVersion = '1.13.0'

//
//------//
// Main //
//------//

const maybeFindLocalPrettierInstance = filepath => {
  return pkgUp(path.dirname(filepath))
    .then(packageJsonFilepath => {
      return packageJsonFilepath
        ? Promise.all([readFile(packageJsonFilepath), packageJsonFilepath])
        : undefined
    })
    .then(result => {
      if (!result) return

      const [packageJsonContent, packageJsonFilepath] = result,
        json = tryParseJson(packageJsonContent)

      if (!json) return
      const {
        dependencies = {},
        devDependencies = {},
      } = json

      if (!(dependencies.prettier || devDependencies.prettier)) return

      const packageJsonDir = path.dirname(packageJsonFilepath)

      try {
        const prettier = importFrom(packageJsonDir, 'prettier')

        return (semver.gte(prettier.version, minimumSupportedPrettierVersion))
          ? prettier
          : undefined
      }
      catch(_unused_error) {
        return
      }
    })
}

//
//------------------//
// Helper Functions //
//------------------//

function readFile(filepath) {
  return pify(fs.readFile)(filepath, 'utf8')
}

function tryParseJson(string) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return false;
  }
}

//
//---------//
// Exports //
//---------//

export default maybeFindLocalPrettierInstance
