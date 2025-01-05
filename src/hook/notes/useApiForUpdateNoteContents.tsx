// src/hooks/notes/useApiForUpdateNoteContents.ts
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateNoteContent } from '@/api/notes/apiForNoteContents';
import { NoteContent } from '@/types/notes/typeForNoteContents';

interface UseApiForUpdateNoteContentsProps {
  noteId: string;
  pageNum?: number;
}

const useApiForUpdateNoteContents = ({ noteId, pageNum }: UseApiForUpdateNoteContentsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const updateContent = async (contentId: number, data: Partial<NoteContent>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateNoteContent(noteId, contentId, data);
      
      // Invalidate and refetch queries
      await queryClient.invalidateQueries({
        queryKey: ['noteContents', noteId, pageNum]
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update note content'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateNoteContent: updateContent,
    isLoading,
    error
  };
};

export default useApiForUpdateNoteContents;