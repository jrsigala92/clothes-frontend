import { Category } from './category';
import { Status } from './status';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    userID:number;
    createdAt: Date;
    createdAtFormated: string;
    categoryID:number;
    category:Category;
    categoryName:string;
    statusName:string;
    // category:string;
    statusID:number;
    status:Status;
}
