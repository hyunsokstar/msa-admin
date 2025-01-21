// src\hook\user\useApiForPersonalDevSpecs.tsx

import { useQuery } from '@tanstack/react-query';
import { apiForGetPersonalDevSpecs } from '@/api/user/apiForProfile';
import { PersonalDevSpec } from '@/types/typeForProfile';

interface TreeResponse {
 data: PersonalDevSpec[];
}

export const useApiForPersonalDevSpecs = () => {
 return useQuery<TreeResponse, Error>({
   queryKey: ['personalDevSpecs'],
   queryFn: apiForGetPersonalDevSpecs,
   staleTime: 5000,
 });
};