// src/components/RoadmapForCTIIntegration.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoadmapItem {
  title: string;
  summary: string;
  url: string;
  difficulty: string;
}

const roadmap: RoadmapItem[] = [
  {
    title: 'C 심화: 포인터, 배열, 구조체',
    summary: '포인터의 개념, 배열과 포인터의 관계, 구조체를 활용한 데이터 구조 설계 및 활용법 학습',
    url: 'https://studyc.tistory.com/15',
    difficulty: 'Beginner',
  },
  {
    title: '파일 입출력 및 동적 메모리 관리',
    summary: 'open, read, write, close 시스템 콜을 이용한 파일 처리 방법 및 malloc/free를 활용한 동적 메모리 관리',
    url: 'https://hagisilecoding.tistory.com/128',
    difficulty: 'Beginner',
  },
  {
    title: 'TCP/IP 소켓 프로그래밍',
    summary: 'socket(), bind(), listen(), accept() 등을 이용한 서버-클라이언트 통신 구현 및 기초 네트워크 개념 학습',
    url: 'https://dev-nicitis.tistory.com/25',
    difficulty: 'Intermediate',
  },
  {
    title: 'I/O 멀티플렉싱: select, epoll',
    summary: 'select와 epoll을 이용해 다중 클라이언트 연결을 효율적으로 처리하는 방법 및 성능 비교 이해',
    url: 'https://rammuking.tistory.com/entry/Epoll%EC%9D%98-%EA%B8%B0%EC%B4%88-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%9C%EB%B2%95',
    difficulty: 'Intermediate',
  },
  {
    title: '리눅스 시스템 콜 이해',
    summary: 'fork, exec, pipe, signal 등 기본 시스템 콜을 이해하고 활용하여 프로세스 및 I/O 제어 능력 배양',
    url: 'https://studyheon.tistory.com/10',
    difficulty: 'Intermediate',
  },
  {
    title: 'CTI 장비 연동용 SDK 분석',
    summary: 'Cisco CTI OS 등 대표적인 CTI 서버 API/SDK를 분석하고 호 제어, 이벤트 처리 루틴 구현 실습',
    url: 'https://www.cisco.com/web/KR/products/pc/ccs/cti/ccmigration_ac9ac.pdf',
    difficulty: 'Advanced',
  },
  {
    title: '디버깅 및 안정성 확보: GDB, Valgrind',
    summary: 'GDB를 활용한 실전 디버깅 기법 및 Valgrind를 이용한 메모리 누수 검출과 프로파일링',
    url: 'https://9yelin9.tistory.com/35',
    difficulty: 'Beginner',
  },
];

const RoadmapForCTIIntegration: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📋 CTI 기간계 연동팀 투입 로드맵
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmap.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm mb-4 leading-snug">
                {item.summary}
              </p>
              <p className="text-xs text-gray-500 mb-4">난이도: {item.difficulty}</p>
              <div className="flex justify-center mt-4">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} /> 참고 자료
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoadmapForCTIIntegration;
