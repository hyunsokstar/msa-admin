// src\api\apiForResourcesBoard.ts

import { ResourcesBoardType } from "../types/typeForResourcesBoard";


export interface GetResourcesBoardParams {
    page?: number;
    pageSize?: number;
}

export interface GetResourcesBoardResponse {
    data: ResourcesBoardType[];
    pagination: {
        currentPage: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export const apiForGetResourcesBoardList = async (params: GetResourcesBoardParams = {}): Promise<GetResourcesBoardResponse> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());

    const response = await fetch(`/api/resources-board?${searchParams.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to fetch resources board data');
    }

    return response.json();
};