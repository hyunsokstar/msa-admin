import ClangBasicNote1 from '@/app/task-admin/strategy-report-for-web-cti/ClangBasicNote1';
import ClangBasicNote2 from '@/app/task-admin/strategy-report-for-web-cti/ClangBasicNote2';
import RoadmapForCTIIntegration from '@/app/task-admin/strategy-report-for-web-cti/RoadmapForCTIIntegration';
import React from 'react';

interface Props {}

const ClangBasic = (props: Props) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-2">
            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
                    C 언어 기초 요약
                </h1>
                <p className="text-lg text-gray-600">
                    시스템 프로그래밍 언어 C의 기초 문법을 학습하고, 구조체와 포인터의 활용법을 익혀보세요 !
                </p>
            </div>

            {/* C 기본 문법 카드 */}
            <section
                id="note-c-basics"
                className="max-w-3xl mx-auto" // Removed mb-12, separator will handle spacing
            >
                <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-blue-100">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <span className="inline-block w-2 h-6 bg-blue-400 rounded-full mr-2" />
                        C 기본 문법
                    </h2>
                    <ClangBasicNote1 />
                </div>
            </section>

            {/* 구분선 */}
            <div className="flex justify-center my-8"> {/* Creates 32px margin top & bottom */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 rounded-full" />
            </div>

            {/* C 구조체와 활용 카드 */}
            <section
                id="note-c-structs"
                className="max-w-3xl mx-auto mb-8" // Added mb-8 for spacing to the next section
            >
                <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-purple-100">
                    <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
                        <span className="inline-block w-2 h-6 bg-purple-400 rounded-full mr-2" />
                        C 구조체와 활용
                    </h2>
                    <ClangBasicNote2 />
                </div>
            </section>

            {/* C 로드맵 카드 */}
            <section
                id="note-c-roadmap" // Corrected ID
                className="max-w-3xl mx-auto mb-12" // Retains mb-12 for final page spacing
            >
                <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-indigo-100"> {/* Thematic border color */}
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2"> {/* Thematic text color */}
                        <span className="inline-block w-2 h-6 bg-indigo-400 rounded-full mr-2" /> {/* Thematic accent color */}
                        C 로드맵
                    </h2>
                    <RoadmapForCTIIntegration />
                </div>
            </section>
        </div>
    );
};

export default ClangBasic;