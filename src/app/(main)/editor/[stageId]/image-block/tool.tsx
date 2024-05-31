import React from 'react';
import ImageUploader from './image-uploader';
import { createRoot, Root } from 'react-dom/client';
import CustomBlock from './custom-block';
import * as ReactDOMClient from 'react-dom/client';
import TestBlock from './test-block';
import { Timer } from 'lucide-react';

export interface ImageBlockData {
    image: string;
}

interface CustomBlockToolConfig {
    data: ImageBlockData;
    config: any;
    api: any;
    readOnly: boolean;

}

export default class ImageBlock {
    data: ImageBlockData;
    api: any;
    wrapper: HTMLElement | null;
    root: Root | null;
    readOnly: boolean;
    nodes: any;

    constructor({ data, config, api, readOnly }: CustomBlockToolConfig) {
        this.data = data;
        this.api = api;
        this.readOnly = readOnly;
        this.wrapper = null;
        this.root = null;

        this.nodes = {
            holder: null,
        };
    }

    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
        };
    }

    static get isReadOnlySupported() {
        return true;
    }

    render() {

        this.wrapper = document.createElement('div');
        this.root = ReactDOMClient.createRoot(this.wrapper as HTMLElement); // Create a root

        this.root.render(<CustomBlock
            data={this.data.image}
            onChange={(data: ImageBlockData) => this.updateData(data)}
        />);


        return this.wrapper;
    }

    updateData(data: ImageBlockData) {
        this.data = data;
      }

    save() {
        return this.data;
    }
}