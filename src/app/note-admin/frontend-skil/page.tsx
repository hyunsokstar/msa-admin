import FrontendTechTable from '@/app/task-admin/strategy-report-for-web-cti/FrontendTechTable'
import React from 'react'

interface Props {

}

const page = (props: Props) => {
    return (
        <div>
            <section id="backend-tech-table" className="mb-8">
                <FrontendTechTable />
            </section>
        </div>
    )
}

export default page
