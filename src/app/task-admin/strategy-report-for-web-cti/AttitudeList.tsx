// src/components/AttitudeList.tsx
"use client";

import React from "react";
import AttitudeItem from "./AttitudeItem";

const attitudes = [
  {
    title: "1. 코드는 살아있는 유기체처럼 리팩토링되어야 한다",
    description: (
      <>
        <p>반복적이고 집요한 리팩토링으로 코드베이스를 간결하고 협업에 강한 구조로 진화시킵니다.</p>
        <p>함축성과 실용성, 구조적 완성도의 조화가 중요하며, 코드는 정적 자산이 아닌 유기체입니다.</p>
      </>
    )
  },
  {
    title: "2. 조던처럼, 완벽하고 우아한 코드",
    description: (
      <>
        <p>핵심 기능을 정교하게 완성하는 집중력과 균형 잡힌 코드 미학을 추구합니다.</p>
        <p>읽는 사람도 감동받는 예술적 완성도를 목표로 합니다.</p>
      </>
    )
  },
  {
    title: "3. 드론의 민첩함, 탱크의 화력",
    description: (
      <>
        <p>드론 같은 민첩함과 탱크 같은 견고함을 동시에 갖추어야 합니다.</p>
        <p>기술은 무기이며, 아키텍처는 전장의 설계도입니다.</p>
      </>
    )
  },
  {
    title: "4. 풀스택은 기본 자격 (진정한 테크 브리지 빌더)",
    description: (
      <>
        <p>프론트엔드, 백엔드, 데이터베이스, DevOps를 유연하게 넘나들며 설계와 구현을 합니다.</p>
        <p>BFF 패턴 도입과 글로벌 기업 사례를 참고해 전반을 조율합니다.</p>
      </>
    )
  },
  {
    title: "5. 타이슨의 기백 + 메이웨더의 운영",
    description: (
      <>
        <p>파괴적 추진력과 치밀한 전략 운영을 겸비하며 기술과 태도를 모두 갖춥니다.</p>
        <p>중소기업은 기술력으로 승부하고, 글로벌 혁신 기업의 사례를 벤치마킹합니다.</p>
      </>
    )
  },
  {
    title: "6. 상상력과 깡다구 (피구왕 통키, 루피)",
    description: (
      <>
        <p>한계를 뛰어넘는 상상력과 대담함으로 새로운 솔루션을 창출합니다.</p>
      </>
    )
  },
  {
    title: "7. 무한 성장 (드래곤볼 손오공)",
    description: (
      <>
        <p>지속적 학습과 도전을 통해 끝없이 성장하며 레벨업합니다.</p>
      </>
    )
  },
  {
    title: "8. 영리함 (까마귀, 비글, 시바견, 보더콜리, 앵무새)",
    description: (
      <>
        <p>다채로운 지능형 전략을 구사하여 문제 해결과 협업을 최적화합니다.</p>
      </>
    )
  },
  {
    title: "9. 대범함과 저항 정신 (북한의 해킹집단, 우크라이나)",
    description: (
      <>
        <p>불굴의 의지와 전략적 도전으로 어려움을 돌파합니다.</p>
      </>
    )
  },
  {
    title: "10. 진정성 있는 몰입 (Authentic Immersion)",
    description: (
      <>
        <p>위험을 감수하고 현장에서 직접 개선하며, 일상의 모든 시간을 배움에 투자합니다.</p>
        <p>명언과 조언을 실천하며 헌신과 집중을 생활화합니다.</p>
      </>
    )
  }
];

const AttitudeList: React.FC = () => (
  <div className="max-w-3xl mx-auto p-4">
    {attitudes.map(item => (
      <AttitudeItem
        key={item.title}
        title={item.title}
        description={item.description}
      />
    ))}
  </div>
);

export default AttitudeList;
