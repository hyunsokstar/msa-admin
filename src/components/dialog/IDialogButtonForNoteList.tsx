'use client'

import React, { useState } from 'react'
import { List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommonDialogButton from '@/components/common/CommonDialogButton'
import { ITableForNoteListForSelectedCollectionWithDnd } from '@/app/note-admin/note-collection-list/_comp/ITableForNoteListForSelectedCollectionWithDnd'

interface Props {
    collectionId: string
    currentNoteId: string
    currentNoteTitle: string
}

const IDialogButtonForNoteList = ({
    collectionId,
    currentNoteId,
    currentNoteTitle
}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectNote = (noteId: string, noteTitle: string) => {
        if (noteId === currentNoteId) {
            setIsOpen(false)
            return
        }

        const url = new URL(window.location.href)
        url.pathname = `/note-admin/notes/${noteId}/note-contents`
        url.searchParams.set('collectionId', collectionId)
        url.searchParams.set('noteTitle', noteTitle)
        window.location.href = url.toString()
    }

    return (
        <CommonDialogButton
            title="노트 목록"
            widthPercent={90}
            heightPercent={90}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <Button
                    variant="outline"
                    size="icon"
                    title={`현재 노트: ${decodeURIComponent(currentNoteTitle)}`}
                >
                    <List className="h-5 w-5" />
                </Button>
            }
        >
            <ITableForNoteListForSelectedCollectionWithDnd
                collectionId={collectionId}
                currentNoteId={currentNoteId}
                onClickNote={handleSelectNote}
                onCloseDialog={() => setIsOpen(false)} // ✅ 이 부분 추가 필수!
            />
        </CommonDialogButton>
    )
}

export default IDialogButtonForNoteList
