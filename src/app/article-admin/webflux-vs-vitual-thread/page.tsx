import React from 'react'

const ComparisonCard = ({
    title,
    analogy,
    description,
    keywords,
    useCase,
}: {
    title: string
    analogy: string
    description: string
    keywords: string[]
    useCase: string
}) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 italic mb-4">"{analogy}"</p>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                    <span key={kw} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                        {kw}
                    </span>
                ))}
            </div>
        </div>
        <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Best For</h4>
            <p className="text-sm font-medium text-gray-900">{useCase}</p>
        </div>
    </div>
)

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-6xl px-6">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">WebFlux vs. Virtual Threads</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        A Report on Modern Java Concurrency and its Connection to Go
                    </p>
                </header>

                {/* Section 1: WebFlux vs Virtual Threads */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        When to Use What: A Tale of Two Models
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <ComparisonCard
                            title="WebFlux: Stream Control"
                            analogy="컨베이어 벨트 위의 물건들이 막힘없이 잘 흐르게 하자!"
                            description="끊임없이 쏟아지는 이벤트 스트림을 하나의 거대한 파이프라인으로 보고, 이 흐름이 막히거나 넘치지 않도록 실시간으로 제어하고 가공하는 데 초점을 맞춥니다."
                            keywords={['Backpressure', 'Event-Driven', 'Non-Blocking', 'Infinite Streams']}
                            useCase="대량 이벤트 전파/구독 (e.g., Redis Streams, Kafka)"
                        />
                        <ComparisonCard
                            title="Virtual Threads: Request Parallelism"
                            analogy="수백만 명의 손님을 각자 전담 마크하는 웨이터를 붙여 동시에 빠르게 처리하자!"
                            description="하나의 요청을 처리하기 위해 여러 독립적인 I/O 작업(DB, API 호출)들을 동시에 실행하고, 결과를 조합하여 최종 응답을 만드는 데 초점을 맞춥니다."
                            keywords={['Throughput', 'Blocking I/O', 'Request-Response', 'Parallel Tasks']}
                            useCase="여러 I/O 바운드 작업을 포함하는 동시 다발적인 단순 조회"
                        />
                    </div>
                </section>

                {/* Section 2: The Go Connection */}
                <section className="mb-12 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        The Go Connection: Virtual Threads vs. Goroutines
                    </h2>
                    <p className="text-center text-gray-700 mb-6 max-w-3xl mx-auto">
                        Java의 가상 스레드는 Go의 성공적인 동시성 모델(고루틴)에 대한 강력한 응답입니다. 둘 다 'M:N 스케줄러'라는 동일한 원리를 공유하지만, 철학과 접근 방식에는 차이가 있습니다.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left font-semibold text-gray-700">Feature</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Go Goroutine</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Java Virtual Thread</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">핵심 원리</td>
                                    <td className="p-3" colSpan={2}>
                                        <span className="font-semibold text-blue-600">동일</span>: OS 스레드를 블로킹하지 않는 가벼운 동시성 (M:N 스케줄러)
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">프로그래밍 모델</td>
                                    <td className="p-3">채널(Channel)을 통한 명시적 데이터 교환 (CSP 모델)</td>
                                    <td className="p-3">기존의 동기/블로킹 코드 스타일을 그대로 유지</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">언어 통합</td>
                                    <td className="p-3">언어 설계 초기부터 핵심 기능으로 포함 (`go` 키워드)</td>
                                    <td className="p-3">기존 생태계와의 하위 호환성을 위해 나중에 추가</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="p-3 font-medium">자동차 비유</td>
                                    <td className="p-3">테슬라: 전기차 시장을 개척한 혁신가</td>
                                    <td className="p-3">토요타: 베스트셀러에 전기 모터를 얹은 전통 강자</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 3: The Verdict */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        The Verdict: Pioneer vs. Successful Counter-Attack
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Go: The Pioneer</h3>
                            <p className="text-sm text-gray-700 space-y-3">
                                <span>Go는 '동시성'을 언어 문법 레벨로 끌어올려 프로그래밍 패러다임을 바꾼 게임 체인저입니다. `go` 키워드 하나로 동시성 구현의 진입 장벽을 극적으로 낮추었고, 클라우드 네이티브 시대의 표준을 제시했습니다.</span>
                                <span className="block font-medium text-gray-800">Go의 혁신이 있었기에 Java가 발전할 수 있었습니다.</span>
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Java: The Counter-Attack</h3>
                            <p className="text-sm text-gray-700 space-y-3">
                                <span>Java의 가상 스레드는 후발주자이지만, 이는 시장을 읽고 더 현명하게 움직인 전략적인 한 수입니다. 기존의 방대한 Java 생태계와 개발자들의 코딩 스타일을 그대로 유지하면서, 밑단(JVM)에서 알아서 고성능 동시성을 처리해 줍니다.</span>
                                <span className="block font-medium text-gray-800">학습 비용 없이 시스템 성능을 극대화하는 '마법' 같은 경험을 제공합니다.</span>
                            </p>
                        </div>
                    </div>
                </section>

                <footer className="text-center mt-12 text-gray-600 text-sm">
                    <p>결론: 두 언어 모두 승자입니다. Go의 혁신적인 도전이 있었기에 Java가 안주하지 않고 발전할 수 있었고,</p>
                    <p>Java의 성공적인 역공은 가벼운 동시성 모델이 이제 '표준'이 되었음을 증명합니다.</p>
                </footer>
            </div>
        </div>
    )
}

export default Page