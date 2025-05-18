
"use client";

import React from "react";

interface LinkComponentProps {
    href: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
}

export default function LinkComponent({
    href,
    children,
    target = "_blank",
    rel = "noopener noreferrer"
}: LinkComponentProps) {
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className="text-blue-600 underline hover:text-blue-800"
            onClick={(e) => {
                // Handle click explicitly to ensure proper new tab opening
                e.preventDefault();
                window.open(href, target, rel);
            }}
        >
            {children}
        </a>
    );
}