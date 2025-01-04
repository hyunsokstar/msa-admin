// src/hooks/useApiForCreateNote.ts
import { apiForCreateNote } from '@/api/notes/apiForNotes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiForCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiForCreateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export default useApiForCreateNote;