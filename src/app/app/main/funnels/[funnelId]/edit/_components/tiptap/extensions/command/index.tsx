import { Extension, Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from '@tiptap/suggestion'
import { ReactNode, RefObject } from "react";
import tippy, { type GetReferenceClientRect, type Instance, type Props } from "tippy.js";
import { CommandOut } from "./command-components";

export const Command = Extension.create({
  name: 'command',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        // allowSpaces: true,
        startOfLine: false,
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: any }) => {
          props.command({ editor, range, props })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      })
    ]
  }
})

export const renderItems = (elementRef?: RefObject<Element> | null) => {
  let component: ReactRenderer | null = null;
  let popup: Instance<Props>[] | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect; query: string }) => {
      component = new ReactRenderer(CommandOut, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => (elementRef ? elementRef.current : document.body),
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: GetReferenceClientRect; query: string }) => {
      component?.updateProps(props);

      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};

export interface SuggestionItem {
  title: string;
  description: string;
  icon: ReactNode;
  searchTerms?: string[];
  command?: (props: { editor: Editor; range: Range }) => void;
}
