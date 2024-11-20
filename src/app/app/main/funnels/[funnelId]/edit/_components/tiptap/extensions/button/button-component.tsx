import React, { useState, useEffect } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Button } from '@/app/_components/ui/button'

const ButtonComponent: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const [text, setText] = useState(node.attrs.text)

  useEffect(() => {
    setText(node.attrs.text)
  }, [node.attrs.text])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    setText(newText)
    updateAttributes({ text: newText })
  }

  return (
    <NodeViewWrapper className="react-component-button cursor-pointer">
      <Button
        className="!cursor-pointer"
        contentEditable={false}
        data-type="button"
      >
        <span className="">Test</span>
        {/* <input
          type="text"
          value={text}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0"
        /> */}
      </Button>
    </NodeViewWrapper>
  )
}

export default ButtonComponent