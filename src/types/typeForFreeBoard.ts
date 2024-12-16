// src/types/typeForFreeBoard.ts

export interface IFreeBoard {
  id: number;
  title: string;
  content: string;
  writer_id: string;
  created_at: string;
  updated_at: string;
}

export interface IRequestDtoForApiForGetFreeBoardList {
  page: number;
  limit: number;
}

export interface IResponseDtoForApiForGetFreeBoardList {
  items: IFreeBoard[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ICreateFreeBoardDto {
  title: string;
  content: string;
}