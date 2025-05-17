// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\utils\uploadHelpers.ts
"use client";

export async function uploadFileToS3(file: File): Promise<string> {
    // 1) Presigned URL 요청
    const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    if (!res.ok) throw new Error("Presigned URL 요청 실패");
    const { presignedUrl, fileUrl } = await res.json();

    // 2) S3 업로드
    const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
    });
    if (!uploadRes.ok) throw new Error("S3 업로드 실패");

    return fileUrl;
}
