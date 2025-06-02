// src/components/FullStackForCTI.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fullStackItems: {
  category: string;
  description: React.ReactNode;
}[] = [
  {
    category: '시스템 언어',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>C/C++</strong> <br />
            CTI 장치 드라이버나 로우 레벨 통신 모듈 개발에 사용됩니다.
          </li>
          <li>
            <strong>Java / Go / Rust</strong> <br />
            백엔드 API 서버나 마이크로서비스 구현 시 성능과 안정성을 고려해 선택합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '디자인',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>UI/UX 기초 지식</strong> <br />
            CTI 대시보드나 모니터링 화면을 사용자 관점에서 설계하는 데 필요합니다.
          </li>
          <li>
            <strong>아키텍처 다이어그램 작성 능력</strong> <br />
            ERD, 플로우차트 등을 통해 시스템 전반을 시각화합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '백엔드',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>RESTful API 설계/구현</strong> <br />
            상담원, 캠페인, 스킬 매핑 등 CRUD 기능을 구현합니다.
          </li>
          <li>
            <strong>SSE / WebSocket / gRPC</strong> <br />
            실시간 양방향 통신을 구현하여 콜 상태, 알림 등을 처리합니다.
          </li>
          <li>
            <strong>데이터베이스 설계</strong> <br />
            MySQL, PostgreSQL, Redis 등과 ORM을 활용해 데이터 구조를 설계·운영합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '프론트엔드',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>React / Next.js</strong> <br />
            CTI 관리 화면과 실시간 콜 상태 표시 등을 구현합니다.
          </li>
          <li>
            <strong>상태 관리 & 데이터 페칭</strong> <br />
            Zustand, Redux Toolkit 및 TanStack Query를 이용해 전역 상태와 서버 데이터를 관리합니다.
          </li>
          <li>
            <strong>Tailwind CSS / shadcn-ui / Radix UI</strong> <br />
            일관된 디자인 시스템과 모듈화된 컴포넌트를 사용해 UI를 구성합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '데스크톱',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Electron / Tauri</strong> <br />
            상담원용 전용 소프트폰이나 모니터링 툴을 데스크톱으로 빌드합니다.
          </li>
          <li>
            <strong>네이티브 API 호출</strong> <br />
            마이크/스피커 제어, 로컬 네트워크 장치 스캔 등을 수행합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '앱 (모바일)',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>React Native / Flutter / Kotlin / Swift</strong> <br />
            상담원 전용 모바일 앱을 통해 콜 모니터링, 알림, 채팅 기능을 구현합니다.
          </li>
          <li>
            <strong>푸시 알림 & 권한 관리</strong> <br />
            네이티브 푸시 알림 설정과 로컬 네트워크 권한을 관리합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '네트워크',
    description: (
      <>
        <p className="mb-2 font-semibold">네트워크를 이해해야 하는 이유:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>통신 품질 보장 & 지연 최적화</strong> <br />
            CTI 시스템에서 음성/영상/데이터를 실시간 주고받을 때 네트워크 지연(latency)과 패킷 손실(packet loss)이
            품질 저하로 직결됩니다.
          </li>
          <li>
            <strong>프로토콜 프로그래밍 (SIP, RTP, WebRTC)</strong> <br />
            SIP로 세션을 생성하고 RTP로 음성 데이터를 전송하거나, WebRTC를 활용해 브라우저 기반 음성/영상 통신을 구현할 때
            네트워크 계층부터 이해해야 합니다.
          </li>
          <li>
            <strong>보안 및 방화벽 설정</strong> <br />
            TLS/SSL을 통한 암호화, SIP(5060/5061), RTP(10000~20000) 등 포트 개방 정책을 정확히 설정해야 안전한 통신이 가능합니다.
          </li>
          <li>
            <strong>인프라 구성 최적화</strong> <br />
            로드밸런서, 리버스 프록시, VPN, DMZ 등을 이해해 대규모 트래픽을 분산 처리하고 세션 스티키니스(Session Stickiness)를
            고려한 구성을 해야 합니다.
          </li>
          <li>
            <strong>동시 연결 & 성능 튜닝</strong> <br />
            수백~수천 건 동시 콜 처리 시 소켓 재사용(Time-Wait), 파일 디스크립터 부족(FD exhaustion) 등을
            예방하기 위해 OS 네트워크 파라미터를 최적화해야 합니다.
          </li>
          <li>
            <strong>클라우드 네이티브 & MSA 대응</strong> <br />
            VPC, 서브넷, 라우팅 테이블, NAT 게이트웨이, 로드밸런서(ALB/NLB) 등을 설정하고 서비스 메시(Service Mesh)를
            이해해야 클라우드 환경에서 안정적이고 확장 가능한 네트워크를 구성할 수 있습니다.
          </li>
          <li>
            <strong>트러블슈팅 능력</strong> <br />
            Wireshark, tcpdump 등을 사용하여 패킷 캡처 후 SIP 메시지 재전송, RTP 패킷 손실, DTLS 실패 등의
            네트워크 수준 문제를 신속하게 찾아내야 합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: 'DevOps',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>CI/CD 파이프라인</strong> <br />
            GitHub Actions, Jenkins 등을 이용해 코드 빌드, 테스트, 배포를 자동화합니다.
          </li>
          <li>
            <strong>Docker & Kubernetes</strong> <br />
            컨테이너화와 오케스트레이션을 통해 서비스 확장성과 일관성을 확보합니다.
          </li>
          <li>
            <strong>Infra as Code</strong> <br />
            Terraform, Ansible 등을 사용해 VPC, 서브넷, 보안 그룹 등 네트워크 리소스를 선언적으로 관리합니다.
          </li>
          <li>
            <strong>모니터링 & 로깅</strong> <br />
            Prometheus/Grafana, ELK Stack 등을 활용해 서비스 상태와 로그를 실시간으로 모니터링합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '애자일 (Agile)',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>스크럼, 칸반</strong> <br />
            스프린트, 데일리 스탠드업, 회고 등을 통해 짧은 주기로 기능을 릴리스하고 피드백을 반영합니다.
          </li>
          <li>
            <strong>스토리 작성 & 버그 트래킹</strong> <br />
            Jira, GitHub Issues 등을 활용해 요구사항과 버그를 관리합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    category: '클린 코드',
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>SOLID, DRY, KISS 원칙</strong> <br />
            유지보수성과 가독성을 위해 코드 구조를 단순·명확하게 설계합니다.
          </li>
          <li>
            <strong>코드 리뷰 & 리팩토링</strong> <br />
            주기적인 리뷰를 통해 코드 품질을 높이고, 필요 시 리팩토링하여 기술 부채를 줄입니다.
          </li>
          <li>
            <strong>테스트 주도 개발 (TDD)</strong> <br />
            Jest, Playwright 등을 활용해 유닛/통합/E2E 테스트를 작성하여 안정성을 확보합니다.
          </li>
        </ul>
      </>
    ),
  },
];

const FullStackForCTI: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow p-8 max-w-7xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🔧 Full Stack을 위하여
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        CTI 시스템 개발을 위해 알아야 할 전반적인 기술 스택과 네트워크 이해의 중요성입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fullStackItems.map((item, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {item.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm">
              {item.description}
            </CardContent>
          </Card>
        ))}
      </div>

      {/** 참고 자료 섹션 **/}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
          📚 참고 자료
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-blue-700">
          <li>
            <a
              href="https://www.inflearn.com/course/상처-함께-개발하기"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Inflearn – 상처 함께 개발하기
            </a>
          </li>
          <li>
            <a
              href="https://www.inflearn.com/search?s=network"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Inflearn – Network 검색 결과
            </a>
          </li>
          <li>
            <a
              href="https://www.inflearn.com/search?s=canvas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Inflearn – Canvas 검색 결과
            </a>
          </li>
          <li>
            <a
              href="https://www.inflearn.com/search?s=figma"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Inflearn – Figma 검색 결과
            </a>
          </li>
          <li>
            <a
              href="https://www.inflearn.com/search?s=java"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Inflearn – Java 검색 결과
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FullStackForCTI;
