import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ButtonComponent from './button-component'

export interface ButtonOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    button: {
      /**
       * Add a button
       */
      setButton: (options?: { text?: string }) => ReturnType
    }
  }
}

export const Button = Node.create<ButtonOptions>({
  name: 'button',

  group: 'inline',

  inline: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      text: {
        default: 'Click me',
        parseHTML: element => element.textContent,
        renderHTML: attributes => {
          return {
            'data-button-text': attributes.text,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'button[data-button-text]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['button', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonComponent)
  },
})