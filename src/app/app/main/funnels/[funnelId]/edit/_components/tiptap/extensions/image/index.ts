import Image from "@tiptap/extension-image";

const ImageExtension = Image.extend({
    name: "image",
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        };
    },
});

export default ImageExtension;