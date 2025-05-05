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
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <div className="flex flex-col md:flex-row md:items-start md:gap-5">
                {/* 이미지 영역 - 컴팩트하게 조정 */}
                <div className="mb-4 md:mb-0 flex-shrink-0">
                    {testTarget.target_image_url ? (
                        <div className="w-80 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md border border-gray-300">
                            <ImageViewer
                                src={testTarget.target_image_url}
                                alt={testTarget.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center shadow-md border border-gray-300">
                            <span className="text-8xl font-light text-gray-400">
                                {testTarget.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* 정보 영역 - 공백 제거하고 꽉 차게 만들기 */}
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold mb-2">{testTarget.name}</h1>
                    {testTarget.description ? (
                        <p className="text-gray-600 mb-3 text-base">{testTarget.description}</p>
                    ) : (
                        <p className="text-gray-400 italic mb-3">설명 없음</p>
                    )}

                    <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                        <div className="bg-gray-50 p-2.5 rounded-md">
                            <span className="text-gray-500 font-medium">담당자:</span> 
                            <span className="ml-2 text-gray-900">{testTarget.assignee_id || '미지정'}</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-md">
                            <span className="text-gray-500 font-medium">등록일:</span> 
                            <span className="ml-2 text-gray-900">
                                {new Date(testTarget.registration_date || testTarget.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* 진행률 */}
                    <div className="mt-3">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium text-lg">전체 테스트 진행률</span>
                            <span className="font-medium text-lg">{testTarget.completion_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full ${testTarget.completion_percentage < 30
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