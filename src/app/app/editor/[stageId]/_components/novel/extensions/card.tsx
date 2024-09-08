'use client'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { Card, CardContent } from '@/app/_components/ui/card'
import StarterKit from '@tiptap/starter-kit'
import NestedEditor from './nested-editor'
import { nestedContent } from './nested-editor/nested-content'

const CardComponent = ({ node, updateAttributes, getPos, editor }: NodeViewProps) => {


  return (
    <NodeViewWrapper className="card-component">
      <Card>
        <CardContent>
          <NestedEditor
            initialContent={nestedContent}
            onChange={(content) => {
              console.log('nested:', content)
            }}
          />
        </CardContent>
      </Card>
    </NodeViewWrapper>
  )
}

export const CardExtension = Node.create({
  name: 'card',
  group: 'block',
  draggable: true,
  selectable: true,
  isolating: true,
  content: 'inline*',
  //inline: false,
  //atom: true, // This makes the node treated as a single unit in the parent editor




  parseHTML() {
    return [{ tag: 'div[data-type="card"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'card' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CardComponent)
  },
})

export default CardExtension
