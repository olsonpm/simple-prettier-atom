//---------//
// Imports //
//---------//

import path from 'path'

//
//------//
// Init //
//------//

const setOfUnsupportedParsers = new Set(['vue'])

//
//------//
// Main //
//------//

const checkWhetherToFormatFile = (filepath, prettier) => {
  return prettier.resolveConfigFile(filepath)
    .then(configFilepath => {
      if (!configFilepath) return

      const ignorePath = getPrettierIgnorePath(configFilepath)
      return Promise.all([
        configFilepath,
        prettier.getFileInfo(filepath, { ignorePath })
      ])
    })
    .then(result => {
      if (!result) return false

      const [configFilepath, fileInfo] = result
      return !!(
        configFilepath &&
        !fileInfo.ignored &&
        fileInfo.inferredParser &&
        !setOfUnsupportedParsers.has(fileInfo.inferredParser)
      )
    })
}

function getPrettierIgnorePath(configFilepath) {
  const configDir = path.dirname(configFilepath)
  return path.join(configDir, '.prettierignore')
}

//
//---------//
// Exports //
//---------//

export default checkWhetherToFormatFile
