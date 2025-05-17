// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\BackgroundColorPicker.tsx
"use client";

import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";

export default function BackgroundColorPicker() {
    const [editor] = useLexicalComposerContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
    };

    return (
        <label className="inline-flex items-center text-sm">
            배경색:
            <input
                type="color"
                onChange={onChange}
                className="ml-1 h-6 w-6 border-none"
                defaultValue="#ffffff"
            />
        </label>
    );
}
