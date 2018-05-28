//---------//
// Imports //
//---------//

import path from 'path'
import prettier from 'prettier'

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
    prettier.resolveConfig(filepath),
    prettier.resolveConfigFile(filepath),
  ]).then(([config, configFilepath]) => {
    if (!configFilepath) return [config]

    const ignorePath = getPrettierIgnorePath(configFilepath)
    return Promise.all([
      config,
      configFilepath,
      prettier.getFileInfo(filepath, { ignorePath })
    ])
  })
  .then(([config, configFilepath, fileInfo]) => {
    if (!configFilepath || fileInfo.ignored || !fileInfo.inferredParser) return

    const { formatted, cursorOffset: updatedCursorOffset } = prettier.formatWithCursor(
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
  const configDir = path.dirname(configFilepath)
  return path.join(configDir, '.prettierignore')
}

//
//---------//
// Exports //
//---------//

export default maybeFormat
