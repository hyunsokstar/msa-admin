import { useQuery } from '@tanstack/react-query';
import { apiForGetNoteCollections } from '../api/apiForNoteCollections';

export const useApiForNoteCollections = () => {
  return useQuery({
    queryKey: ['noteCollections'],
    queryFn: apiForGetNoteCollections,
    staleTime: 5000, // Optional: Adjust caching behavior
  });
};
