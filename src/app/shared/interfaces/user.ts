import { Product } from './product';

export interface User {
    id?: number;
    name:string;
    email: string;
    products?: Product[];
}
