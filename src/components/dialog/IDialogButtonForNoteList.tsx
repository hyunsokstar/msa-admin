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
                    className='mr-2'
                >
                    <List className="h-5 w-5" />
                </Button>
            }
        >
            <div className="p-2">
                <div className="mb-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            window.location.href = '/note-admin/note-collection-list'
                        }}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← 노트 모음으로
                    </Button>
                </div>
                <ITableForNoteListForSelectedCollectionWithDnd
                    collectionId={collectionId}
                    currentNoteId={currentNoteId}
                    onClickNote={handleSelectNote}
                    onCloseDialog={() => setIsOpen(false)}
                />
            </div>
        </CommonDialogButton>
    )
}

export default IDialogButtonForNoteList
