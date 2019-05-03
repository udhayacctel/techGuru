import { User } from './user';
import {School_class_year} from './school_class_year';

export class AppRole{
     
    id: number;
    parent: boolean;
    student: boolean;
    teacher: boolean;
    admin: boolean;

    students: Set<User>;
    classes: Set<School_class_year>;

}
