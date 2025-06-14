'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    noteId: string
    collectionId: string
    noteTitle: string
    currentPage: number
    totalPages?: number
}

export const PageControlForNoteContent = ({
    noteId,
    collectionId,
    noteTitle,
    currentPage,
    totalPages
}: Props) => {
    const router = useRouter()

    const goToPage = (page: number) => {
        const url = new URL(window.location.href)
        url.searchParams.set('collectionId', collectionId)
        url.searchParams.set('noteTitle', noteTitle)
        url.searchParams.set('pageNum', String(page))
        url.pathname = `/note-admin/notes/${noteId}/note-contents`
        router.push(url.toString())
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                variant="ghost"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium text-gray-600">
                Page {currentPage}
            </span>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => goToPage(currentPage + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
