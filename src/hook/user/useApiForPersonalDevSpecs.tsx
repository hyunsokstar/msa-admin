// src\hook\user\useApiForPersonalDevSpecs.tsx

import { useQuery } from '@tanstack/react-query';
import { apiForGetPersonalDevSpecs } from '@/api/user/apiForProfile';
import { PersonalDevSpec } from '@/types/typeForProfile';
import { CreatePersonalDevSpecDto } from '@/types/typeForPersonalDevSpec';

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

export const apiForCreatePersonalDevSpec = async (data: CreatePersonalDevSpecDto) => {
  const response = await fetch('/api/personal-dev-specs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create personal dev spec');
  }

  return response.json();
};
