import { Coupon } from "../models/Coupon";
import { User } from "../models/User";
import { UserType } from "../models/UserType";

export class AppState {
    public userType: UserType = null;
    public isLoggedIn: boolean = null;
  
    // public users:User[]= null;
}