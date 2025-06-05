import React from 'react'
import DGSGraphQLPilotProject from '../../task-admin/strategy-report-for-web-cti/DGSGraphQLPilotProject'
import WhyChooseJooq from '../../task-admin/strategy-report-for-web-cti/WhyChooseJooq '

interface Props {

}

const page = (props: Props) => {
    return (
        <div>

            {/* 11. JOOQ 선택 이유 */}
            <section id="why-choose-jooq" className="mb-8">
                <WhyChooseJooq />
            </section>

            {/* 12. DGS 파일럿 프로젝트 */}
            <section id="dgs-pilot-project" className="mb-8">
                <DGSGraphQLPilotProject />
            </section>
        </div>
    )
}

export default page
