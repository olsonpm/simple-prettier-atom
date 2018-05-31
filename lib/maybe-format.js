//---------//
// Imports //
//---------//

import checkWhetherToFormatFile from './check-whether-to-format-file'
import dedentMacro from 'dedent/macro'
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

      const [config, prettier] = result

      let formatResult

      try {
        formatResult = prettier.formatWithCursor(
          buffer.getText(),
          Object.assign(config, {
            cursorOffset,
            filepath,
          })
        )
      }
      // TODO: add option to log formatting errors to console
      catch(_unused_formattingError) {
        // if we can't format the code then there ain't nothin else to do!
        return
      }

      const { formatted, cursorOffset: updatedCursorOffset } = formatResult

      buffer.setText(formatted)
      const newPosition = buffer.positionForCharacterIndex(updatedCursorOffset)
      editor.setCursorBufferPosition(newPosition)
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(
        dedentMacro(`
          The following unexpected error occurred in 'simple-prettier-atom'

          If this package is up to date, please file an issue in the github repo
            with the error contents so I can make sure to handle it
            appropriately.

          Sorry for the hassle and I appreciate your patience
        `)
      )

      console.error(error)
      /* eslint-enable no-console */
    })
}

//
//---------//
// Exports //
//---------//

export default maybeFormat
