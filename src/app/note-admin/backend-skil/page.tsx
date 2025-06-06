import BackendTechTable from '@/app/task-admin/strategy-report-for-web-cti/BackendTechTable'
import React from 'react'

interface Props {

}

const page = (props: Props) => {
    return (
        <div>
            <section id="backend-tech-table" className="mb-8">
                <BackendTechTable />
            </section>
        </div>
    )
}

export default page
