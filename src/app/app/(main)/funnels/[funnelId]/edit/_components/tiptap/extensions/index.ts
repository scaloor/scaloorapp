import { StarterKit } from '@tiptap/starter-kit'
import { Command } from './command/command-items'
import BulletList from '@tiptap/extension-bullet-list'

const bulletList = BulletList.configure({
    HTMLAttributes: {
      class: 'bg-red-500',
    },
  })

export const extensions = [
    StarterKit,
    bulletList,
    Command,
]