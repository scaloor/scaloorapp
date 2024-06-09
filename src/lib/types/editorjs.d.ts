// src/types/editorjs.d.ts

declare module '@editorjs/editorjs' {
  export interface EditorConfig {
    holder: string;
    tools?: ToolsConfig;
    data?: EditorData;
    placeholder?: string;
    autofocus?: boolean;
    readOnly?: boolean;
    minHeight?: number;
    onChange?: () => void;
    onReady?: () => void;
  }

  export default class EditorJS {
    constructor(config: EditorConfig);
    public isReady: Promise<void>;
    public clear(): Promise<void>;
    public save(): Promise<EditorData>;
    public destroy(): void;
    // Add other methods and properties as needed
    public render(data: EditorData): Promise<void>;
  }

  export interface ToolsConfig {
    [toolName: string]: ToolConfig;
  }

  export interface ToolConfig {
    class: any;
    inlineToolbar?: boolean | string[];
    config?: any;
  }

  export interface EditorData {
    time: number;
    blocks: Block[];
    version: string;
  }

  export interface Block {
    id: string;
    type: string;
    data: BlockData;
  }

  export interface BlockData {
    [key: string]: any;
  }
}
