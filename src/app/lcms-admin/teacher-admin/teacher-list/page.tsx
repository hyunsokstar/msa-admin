"use client";

import ImageCommentComponent from "@/components/ImageCommentEditor";

export default function TeacherListPage() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <h2>이미지 첨삭 컴퍼넌트</h2>
            <ImageCommentComponent />
        </div>
    );
}
