import { mergeAttributes, Node } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import CheckoutNode from "./checkout-node"

export const Checkout = Node.create({
    name: 'checkout',
    group: 'block',
    content: 'inline*',
    // Remove or comment out the following line:
    atom: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    parseHTML() {
        return [{ tag: 'checkout' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['checkout', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(CheckoutNode)
    },
})
