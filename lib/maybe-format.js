//---------//
// Imports //
//---------//

import checkWhetherToFormatFile from './check-whether-to-format-file'
import maybeFindLocalPrettierInstance from './maybe-find-local-prettier-instance'

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

  return maybeFindLocalPrettierInstance(filepath)
    .then(prettier => {
      if (!prettier) return

      return Promise.all([
        checkWhetherToFormatFile(filepath, prettier),
        prettier
      ])
    })
    .then(result => {
      if (!result) return

      const [shouldFormatFile, prettier] = result
      if (!shouldFormatFile) return

      return Promise.all([
        prettier.resolveConfig(filepath),
        prettier,
      ])
    })
    .then(result => {
      if (!result) return

      const [config, prettier] = result,
        { formatted, cursorOffset: updatedCursorOffset } = prettier.formatWithCursor(
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
//---------//
// Exports //
//---------//

export default maybeFormat
