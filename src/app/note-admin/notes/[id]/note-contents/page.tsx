// ✅ NoteContentListPageForNote.tsx (2번 방식으로 수정하여 pageNum을 상태로 관리)
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Edit2, ClipboardCopy } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { NoteContent } from '@/types/notes/typeForNoteContents'
import ICardForNoteContents from './_comp/ICardForNoteContents'
import IDialogButtonForCreateNoteContents from './_comp/IDialogButtonForCreateNoteContents'
import { useApiForGetNoteContents } from '@/hook/notes/useApiForGetNoteContents'
import useApiForDeleteNoteContent from '@/hook/notes/useApiForDeleteNoteContent'
import { Button } from '@/components/ui/button'
import SortableNoteContentList from './_comp/SortableNoteContentList'
import PageNavigationForNoteContentList from './_comp/PageNavigationForNoteContentList'
import { toast } from 'react-toastify'

interface Props {
  params: Promise<{
    id: string
  }>
}

const NoteContentListPageForNote = ({ params }: Props) => {
  const searchParams = useSearchParams()
  const resolvedParams = React.use(params)
  const noteId = resolvedParams.id
  const contentRefs = useRef<{ [key: string]: HTMLDivElement }>({})

  const [pageNum, setPageNum] = useState<number>(1)
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const [selectedNote, setSelectedNote] = useState<NoteContent | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const paramValue = Number(searchParams.get('pageNum'))
    setPageNum(isNaN(paramValue) || paramValue < 1 ? 1 : paramValue)
  }, [searchParams])

  const { data, isLoading, error } = useApiForGetNoteContents({
    noteId,
    pageNum
  })

  const { deleteNoteContent, isPending: isDeleting } =
    useApiForDeleteNoteContent({
      noteId,
      pageNum
    })

  const handleScrollToContent = (contentId: string) => {
    const element = contentRefs.current[contentId]
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
  }

  const handleDelete = (contentId: string) => {
    setDeletingId(contentId)

    console.log('노트 삭제시 noteId, pageNum:', noteId, pageNum)

    deleteNoteContent(Number(contentId), {
      onSettled: () => {
        setDeletingId(null)
      }
    })
  }

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      toast.success('링크가 클립보드에 복사되었습니다!')
    } catch (error) {
      toast.error('링크 복사에 실패했습니다.')
    }
  }

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-[calc(100vh-7.5rem)]'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )

  if (error)
    return (
      <div className='flex items-center justify-center h-[calc(100vh-7.5rem)]'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-red-600'>Error occurred</h2>
          <p className='text-gray-600 mt-2'>Failed to load note contents</p>
        </div>
      </div>
    )

  return (
    <main className='h-[calc(100vh-7.5rem)] bg-gray-100'>
      <div className='h-full max-w-[2000px] mx-auto'>
        <div className='flex h-full gap-4 p-4'>
          <section className='w-3/5 bg-white rounded-lg shadow-md flex flex-col'>
            <div className='p-4 border-b'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-xl font-bold'>Note Contents</h1>

                  <Button
                    variant='outline'
                    onClick={handleCopyLink}
                    className='flex items-center gap-2'
                    size='sm'
                  >
                    <ClipboardCopy className='h-4 w-4' />
                    Copy Link
                  </Button>

                  <Button
                    variant='outline'
                    onClick={() => setIsUpdateMode(!isUpdateMode)}
                    className='flex items-center gap-2'
                    size='sm'
                  >
                    <Edit2 className='h-4 w-4' />
                    {isUpdateMode ? '수정 모드 끄기' : '수정 모드'}
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-gray-500'>Page {pageNum}</p>
                  <IDialogButtonForCreateNoteContents
                    noteId={noteId}
                    pageNum={pageNum}
                  />
                </div>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto p-4'>
              <div className='space-y-2'>
                {data?.data.map((content: NoteContent) => (
                  <div
                    key={content.id}
                    ref={el => {
                      if (el) contentRefs.current[content.id] = el
                    }}
                  >
                    <ICardForNoteContents
                      content={content}
                      isSelected={selectedNote?.id === content.id}
                      isUpdateMode={isUpdateMode}
                      onClick={() => setSelectedNote(content)}
                      noteId={noteId}
                      pageNum={pageNum}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className='w-2/5 bg-white rounded-lg shadow-md flex flex-col'>
            <div className='p-4 border-b'>
              <h2 className='text-lg font-bold'>Note List</h2>
            </div>

            <PageNavigationForNoteContentList
              currentPage={pageNum}
              pages={data?.pages || []}
              noteId={noteId}
            />

            <div className='flex-1 overflow-y-auto p-2'>
              <SortableNoteContentList
                contents={data?.data || []}
                selectedNoteId={selectedNote?.id?.toString() || null}
                setSelectedNote={note => {
                  setSelectedNote(note)
                  handleScrollToContent(note.id.toString())
                }}
                onDelete={handleDelete}
                isDeletingId={deletingId || undefined}
                noteId={noteId}
                pageNum={pageNum}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default NoteContentListPageForNote
