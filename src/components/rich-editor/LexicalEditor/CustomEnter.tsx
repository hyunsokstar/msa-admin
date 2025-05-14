import { Extension } from '@tiptap/core'

const CustomEnter = Extension.create({
  name: 'customEnter',

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        editor.commands.insertContent('<br/>')
        return true
      }
    }
  }
})