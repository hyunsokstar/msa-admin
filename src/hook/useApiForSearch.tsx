"use client";

// src/hooks/useApiForDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchApiSpecs, fetchApiStats, ApiSpec } from '@/api/apiForApiSpec';
import { useEffect, useState } from 'react';

export const useApiForSearch = (specs: ApiSpec[] | undefined) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSpecs, setFilteredSpecs] = useState<ApiSpec[] | undefined>(specs);

    useEffect(() => {
        if (!specs) {
            setFilteredSpecs(undefined);
            return;
        }

        const filtered = specs.filter(spec => 
            spec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spec.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spec.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredSpecs(filtered);
    }, [searchTerm, specs]);

    return { searchTerm, setSearchTerm, filteredSpecs };
};