// components/dialog/IDialogButtonForShowNoteList.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, List } from 'lucide-react'
import CommonDialogButton from '@/components/common/CommonDialogButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface IDialogButtonForShowNoteListProps {
  collectionId: string
  currentNoteId?: string
}

export const IDialogButtonForShowNoteList: React.FC<
  IDialogButtonForShowNoteListProps
> = ({ collectionId, currentNoteId }) => {
  // 노트 목록을 가져오는 API 호출 (실제 구현에 맞게 수정 필요)
  //   const { data, isLoading, error } = useApiForGetNotesList({
  //     collectionId
  //   })

  return (
    <CommonDialogButton
      trigger={
        <Button variant='outline' size='sm' className='flex items-center gap-2'>
          <List className='h-4 w-4' />
          <span>노트 목록</span>
        </Button>
      }
      title={
        <div className='flex items-center gap-2'>
          <FileText className='h-5 w-5 text-blue-600' />
          <span>컬렉션 내 노트 목록</span>
        </div>
      }
      size='lg'
    >
      노트 목록 출력
      {/* <div className='space-y-4'>
        {isLoading ? (
          <div className='flex justify-center p-10'>
            <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : error ? (
          <div className='text-center text-red-500 p-4'>
            노트 목록을 불러오는데 실패했습니다.
          </div>
        ) : (
          <>
            <div className='text-sm text-gray-500 mb-2'>
              총 {data?.length || 0}개의 노트가 있습니다.
            </div>
            <div className='space-y-2 max-h-[60vh] overflow-y-auto pr-2'>
              {data?.map(note => (
                <Link
                  key={note.id}
                  href={`/note-admin/notes/${
                    note.id
                  }/note-contents?collectionId=${collectionId}&noteTitle=${encodeURIComponent(
                    note.title
                  )}`}
                  className={`block p-3 rounded-md border ${
                    currentNoteId === note.id.toString()
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8 border border-gray-200'>
                        <AvatarImage
                          src={note.writer?.profile_image_url || undefined}
                          alt={note.writer?.full_name || 'User'}
                        />
                        <AvatarFallback className='bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium text-sm'>
                          {note.writer?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium text-slate-900'>
                          {note.title}
                        </div>
                        <div className='text-xs text-slate-500 flex items-center gap-2 mt-1'>
                          <span>{note.writer?.full_name || 'Anonymous'}</span>
                          <span>•</span>
                          <time>
                            {new Date(note.created_at).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }
                            )}
                          </time>
                        </div>
                      </div>
                    </div>
                    {currentNoteId === note.id.toString() && (
                      <span className='text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full'>
                        현재 노트
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div> */}
    </CommonDialogButton>
  )
}

export default IDialogButtonForShowNoteList
