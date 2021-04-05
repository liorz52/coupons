import axios from "axios";
import { ChangeEvent } from "react";
import { Component } from "react";
import { Coupon } from "../../models/Coupon";
import "./UpdateCoupon.css";


interface UpdateCouponState {
    description: string;
    amount: number;
    price: number
}
export default class UpdateCoupon extends Component<any, UpdateCouponState> {

    constructor(props: any) {
        super(props);
        this.state = {
            description: "",
            amount: null,
            price: null

        };
    }

    private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
        const description = args.target.value;
        this.setState({ description });
    }
    private setAmount = (args: ChangeEvent<HTMLInputElement>) => {
        const amount = + args.target.value;
        this.setState({ amount });
    }
    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        const price = + args.target.value;
        this.setState({ price });
    }




    private updateCoupon = async () => {

        try {
            const id = this.props.match.params.id;
            const coupon1 = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
            const couponName = coupon1.data.couponName;
            const startDate = coupon1.data.startDate;
            const endDate = coupon1.data.endDate;
            const category = coupon1.data.category;
            const companyName = coupon1.data.companyName;
            const companyid = coupon1.data.companyId;
            let coupon = new Coupon(id, couponName, this.state.description, startDate, endDate, category,
                this.state.amount, this.state.price, companyName, companyid);
            console.log(coupon);
            const response = await axios.put("http://localhost:8080/coupons", coupon);
            alert("Successful update coupon! ");
            {
                sessionStorage.getItem("userType") == "ADMIN" &&
                this.props.history.push('/Admin');
            }
            {
                sessionStorage.getItem("userType") == "COMPANY" &&
                this.props.history.push('/Company');
            }
        } catch (err) {
            alert(err.response.data.errorMessage);
            console.log(JSON.stringify(err));
        }
    }


    public render() {
        return (
            <div className="update-coupon">
                <br />
                <span className="all-writing">
                    description: <br /><br />
                amount:<br /><br />
                price:
                </span>
                <span className="inputs">
                    <input type="text" name="description" onChange={this.setDescription} /><br /><br />
                    <input type="number" name="amount" onChange={this.setAmount} /><br /><br />
                    <input type="number" name="price" onChange={this.setPrice} />
                </span>
                <br /><br />

                <input type="button" value="update coupon" onClick={this.updateCoupon} />

            </div>
        );
    }
}