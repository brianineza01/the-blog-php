import { generateHTML } from "@tiptap/html";
import { defaultExtensions } from "./extensions";

export const getRenderedHTML = (content: Record<string, any>) => {
    const html = generateHTML(content, defaultExtensions);

    return html;
};
