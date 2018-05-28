//---------//
// Imports //
//---------//

import { CompositeDisposable } from 'atom'

import maybeFormat from './maybe-format'

//
//------//
// Init //
//------//

const setOfBuffers = new Set()

//
//------//
// Main //
//------//

export default {
  activate() {

    this.disposables = new CompositeDisposable(
      atom.commands.add('atom-workspace', {
        'simple-prettier-atom:format': maybeFormat,
      }),

      atom.workspace.observeTextEditors(editor => {
        const buffer = editor.getBuffer()

        if (setOfBuffers.has(buffer)) return

        setOfBuffers.add(buffer)
        const disposable = buffer.onWillSave(maybeFormat)
        buffer.onDidDestroy(() => {
          disposable.dispose()
          setOfBuffers.delete(buffer)
        })
      })
    )

  },

  deactivate() {
    this.disposables.dispose()
  },
}
