import { CategoryType } from "./CategoryType";

export class Coupon{
    public constructor(
        public id:number,
        // public image:string,
        public couponName:string,
        public description: string,
        public startDate?: string,
        public endDate?: string,
        public category?:CategoryType,
        public amount?:number,
        public price?:number,        
        public companyName?:string,
        public companyId?: number,
    ){}

   
	
	
	
	
	
}