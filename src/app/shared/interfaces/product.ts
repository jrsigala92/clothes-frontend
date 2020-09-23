import { Category } from './category';
import { Status } from './status';
import { User } from './user';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    userID:number;
    user: User;
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
