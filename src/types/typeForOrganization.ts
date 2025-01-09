// src/types/typeForOrganization.ts
import { IUser } from './typeForUser';

export interface IOrganization {
    id: string;
    name: string;
    parent_id: string | null;
    depth: number;
    path: string;
    members: IUser[];
}