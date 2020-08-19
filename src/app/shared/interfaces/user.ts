import { Product } from './product';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    products?: Product[];
}
