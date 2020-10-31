import { Category } from './category';
import { Classification } from './classification';
import { File } from './file';
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
    size:string;
    statusID:number;
    status:Status;
    classification: Classification;
    classificationID: number;
    files: File[];
}
