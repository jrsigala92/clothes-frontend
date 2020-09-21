import { Product } from './product';

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    email?: string;
    balance?: number;
    products?: Product[];
}
