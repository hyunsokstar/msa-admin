// // C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\ImageUploadPlugin.tsx
// "use client";

// import { useEffect } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
// import { uploadFileToS3 } from "./uploadHelpers";

// export default function ImageUploadPlugin() {
//     const [editor] = useLexicalComposerContext();

//     useEffect(() => {
//         const root = editor.getRootElement();
//         if (!root) return;

//         const handlePaste = async (e: ClipboardEvent) => {
//             const items = e.clipboardData?.items;
//             if (!items) return;
//             for (const item of Array.from(items)) {
//                 if (item.type.startsWith("image/")) {
//                     const file = item.getAsFile();
//                     if (!file) return;
//                     try {
//                         const url = await uploadFileToS3(file);
//                         editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
//                     } catch (err) {
//                         console.error("이미지 업로드 오류:", err);
//                     }
//                     e.preventDefault();
//                     break;
//                 }
//             }
//         };

//         const handleDrop = async (e: DragEvent) => {
//             e.preventDefault();
//             const file = e.dataTransfer?.files[0];
//             if (file?.type.startsWith("image/")) {
//                 try {
//                     const url = await uploadFileToS3(file);
//                     editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
//                 } catch (err) {
//                     console.error("이미지 업로드 오류:", err);
//                 }
//             }
//         };

//         root.addEventListener("paste", handlePaste as any);
//         root.addEventListener("drop", handleDrop as any);
//         root.addEventListener("dragover", (e) => e.preventDefault());

//         return () => {
//             root.removeEventListener("paste", handlePaste as any);
//             root.removeEventListener("drop", handleDrop as any);
//             root.removeEventListener("dragover", (e) => e.preventDefault());
//         };
//     }, [editor]);

//     return null;
// }

// ImageUploadPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { uploadFileToS3 } from "./uploadHelpers";

// 이미지 크기 정보를 포함한 타입
export type ImageUploadData = {
    src: string;
    width: number;
    height: number;
};

// 이미지 실제 크기 측정 함수
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            URL.revokeObjectURL(url); // 메모리 정리

            // 최대 크기 제한 (예: 800px)
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 600;

            let width = naturalWidth;
            let height = naturalHeight;

            // 비율 유지하면서 크기 조정
            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            // 최소 크기 보장
            const MIN_WIDTH = 200;
            const MIN_HEIGHT = 150;

            if (width < MIN_WIDTH || height < MIN_HEIGHT) {
                const ratio = Math.max(MIN_WIDTH / width, MIN_HEIGHT / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            resolve({ width, height });
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            // 오류 시 기본 크기 반환
            resolve({ width: 500, height: 300 });
        };

        img.src = url;
    });
}

export default function ImageUploadPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const root = editor.getRootElement();
        if (!root) return;

        const handlePaste = async (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (const item of Array.from(items)) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if (!file) return;

                    try {
                        // 이미지 크기 측정과 업로드를 병렬로 처리
                        const [url, dimensions] = await Promise.all([
                            uploadFileToS3(file),
                            getImageDimensions(file)
                        ]);

                        const imageData: ImageUploadData = {
                            src: url,
                            width: dimensions.width,
                            height: dimensions.height
                        };

                        editor.dispatchCommand(INSERT_IMAGE_COMMAND, imageData);
                    } catch (err) {
                        console.error("이미지 업로드 오류:", err);
                    }

                    e.preventDefault();
                    break;
                }
            }
        };

        const handleDrop = async (e: DragEvent) => {
            e.preventDefault();
            const file = e.dataTransfer?.files[0];

            if (file?.type.startsWith("image/")) {
                try {
                    // 이미지 크기 측정과 업로드를 병렬로 처리
                    const [url, dimensions] = await Promise.all([
                        uploadFileToS3(file),
                        getImageDimensions(file)
                    ]);

                    const imageData: ImageUploadData = {
                        src: url,
                        width: dimensions.width,
                        height: dimensions.height
                    };

                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, imageData);
                } catch (err) {
                    console.error("이미지 업로드 오류:", err);
                }
            }
        };

        // 파일 입력 핸들러 (버튼 클릭 업로드용)
        const handleFileInput = async (e: Event) => {
            const input = e.target as HTMLInputElement;
            const file = input.files?.[0];

            if (file?.type.startsWith("image/")) {
                try {
                    const [url, dimensions] = await Promise.all([
                        uploadFileToS3(file),
                        getImageDimensions(file)
                    ]);

                    const imageData: ImageUploadData = {
                        src: url,
                        width: dimensions.width,
                        height: dimensions.height
                    };

                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, imageData);
                } catch (err) {
                    console.error("이미지 업로드 오류:", err);
                }
            }

            // 입력 값 초기화
            input.value = '';
        };

        root.addEventListener("paste", handlePaste as any);
        root.addEventListener("drop", handleDrop as any);
        root.addEventListener("dragover", (e) => e.preventDefault());

        // 파일 입력 요소가 있다면 이벤트 리스너 추가
        const fileInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
        fileInputs.forEach(input => {
            input.addEventListener("change", handleFileInput);
        });

        return () => {
            root.removeEventListener("paste", handlePaste as any);
            root.removeEventListener("drop", handleDrop as any);
            root.removeEventListener("dragover", (e) => e.preventDefault());

            fileInputs.forEach(input => {
                input.removeEventListener("change", handleFileInput);
            });
        };
    }, [editor]);

    return null;
}