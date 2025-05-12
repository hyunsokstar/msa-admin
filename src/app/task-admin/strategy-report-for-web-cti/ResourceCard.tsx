import React from 'react';
import Link from 'next/link';

interface ResourceCardProps {
    title: string;
    description: string;
    link?: string;
    imageUrl?: string;
}

const ResourceCard = ({ title, description, link, imageUrl }: ResourceCardProps) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
        <div className="flex items-start">
            {imageUrl && (
                <div className="flex-shrink-0 mr-3">
                    <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded" />
                </div>
            )}
            <div>
                <h4 className="text-lg font-medium text-blue-600 mb-1">{title}</h4>
                <p className="text-gray-600 text-sm mb-2">{description}</p>
                {link && (
                    <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                    >
                        자세히 보기
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    </div>
);

export default ResourceCard;