"use client";

import React, { useState, useEffect } from 'react';

interface ImageViewerProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openFullScreen = () => {
        setIsOpen(true);
        // 스크롤 방지
        document.body.style.overflow = 'hidden';
    };

    const closeFullScreen = () => {
        setIsOpen(false);
        // 스크롤 복원
        document.body.style.overflow = 'auto';
    };

    // ESC 키 이벤트 리스너 추가
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                closeFullScreen();
            }
        };

        // 이벤트 리스너 등록
        if (isOpen) {
            window.addEventListener('keydown', handleEscKey);
        }

        // 컴포넌트 언마운트시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={`cursor-pointer ${className || ''}`}
                onClick={openFullScreen}
            />

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                    onClick={closeFullScreen}
                >
                    <div className="relative max-w-full max-h-full">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                            onClick={closeFullScreen}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageViewer;