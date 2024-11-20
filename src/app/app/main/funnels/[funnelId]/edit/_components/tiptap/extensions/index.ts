import { StarterKit } from '@tiptap/starter-kit'
import { command } from './command/command-items'
import { cn } from '@/lib/utils'
import NodeButtons from './node-buttons'
import Youtube from '@tiptap/extension-youtube'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { Checkout } from './checkout'
import { ButtonExtension } from './button'
import ImageExtension from './image'
import Image from '@tiptap/extension-image'
import { UploadImagesPlugin } from './image/upload-image'

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-6"),
    },

  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-6"),
    },
  },
})

const youtube = Youtube.configure({
  nocookie: true,
})

const tiptapImage = Image.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cn("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
});

const imageExtension = ImageExtension.configure({
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
});

const underline = Underline.configure({})

const color = Color.configure({
  types: ['textStyle'],
})

const highlight = Highlight.configure({})

const textAlign = TextAlign.configure({
  types: ['heading', 'paragraph']
})

const link = Link.configure({})

const checkout = Checkout.configure({})

const buttonExtension = ButtonExtension.configure({})

export const extensions = [
  NodeButtons,
  starterKit,
  command,
  youtube,
  underline,
  TextStyle,
  color,
  highlight,
  textAlign,
  link,
  checkout,
  buttonExtension, // Add the new Button extension
  tiptapImage,
  imageExtension,
]