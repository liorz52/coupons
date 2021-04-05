import { EnumType } from "typescript";
import { UserType } from "./UserType";

export class User{
    public constructor(
        public userName: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public userType?: UserType,
        public id?:number,
        public companyId?: number,
    ){}
}



