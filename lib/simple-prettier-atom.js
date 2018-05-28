//---------//
// Imports //
//---------//

import { CompositeDisposable } from 'atom'

import maybeFormat from './maybe-format'

//
//------//
// Main //
//------//

export default {
  activate() {
    const buffer = atom.workspace.getActiveTextEditor().getBuffer()

    this.disposables = new CompositeDisposable(
      atom.commands.add('atom-workspace', {
        'simple-prettier-atom:format': maybeFormat,
      }),

      buffer.onWillSave(maybeFormat)
    )
  },

  deactivate() {
    this.disposables.dispose()
  },
}
