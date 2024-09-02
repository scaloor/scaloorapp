export const defaultContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Welcome to the Novel Editor!" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is a basic example of the Novel editor with some default content." },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "You can create lists" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Add formatting like " },
                { type: "text", marks: [{ type: "bold" }], text: "bold" },
                { type: "text", text: " and " },
                { type: "text", marks: [{ type: "italic" }], text: "italic" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "And much more!" }],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Feel free to edit this content and explore the editor's capabilities." },
      ],
    },
  ],
};
