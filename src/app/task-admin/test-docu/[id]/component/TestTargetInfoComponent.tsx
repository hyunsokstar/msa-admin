"use client";
import React from 'react';
import { TestTarget } from '@/types/typeForTestTarget';
import Link from 'next/link';
import ImageViewer from './ImageViewer';

interface TestTargetInfoProps {
    testTarget: TestTarget;
}

const TestTargetInfoComponent: React.FC<TestTargetInfoProps> = ({ testTarget }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <div className="flex flex-col md:flex-row">
                {/* 이미지 영역 */}
                <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
                    {testTarget.target_image_url ? (
                        <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
                            <ImageViewer
                                src={testTarget.target_image_url}
                                alt={testTarget.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-6xl font-light text-gray-400">
                                {testTarget.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* 정보 영역 */}
                <div className="md:w-3/4 md:pl-6">
                    <h1 className="text-2xl font-bold mb-2">{testTarget.name}</h1>
                    {testTarget.description ? (
                        <p className="text-gray-600 mb-4">{testTarget.description}</p>
                    ) : (
                        <p className="text-gray-400 italic mb-4">설명 없음</p>
                    )}

                    <div className="flex justify-between items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-gray-500">담당자:</span> <span>{testTarget.assignee_id || '미지정'}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">등록일:</span> <span>
                                    {new Date(testTarget.registration_date || testTarget.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 진행률 */}
                    <div className="mt-4">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium">전체 테스트 진행률</span>
                            <span className="font-medium">{testTarget.completion_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${testTarget.completion_percentage < 30
                                    ? 'bg-red-500'
                                    : testTarget.completion_percentage < 70
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                    }`}
                                style={{ width: `${testTarget.completion_percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestTargetInfoComponent;