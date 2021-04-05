import axios from "axios";
import { ChangeEvent, Component } from "react";
import { CategoryType } from "../../models/CategoryType";
import { Coupon } from "../../models/Coupon";
import "./AddCoupon.css";

interface AddCouponState {
    couponName: string,
    price: number,
    description: string,
    startDate: string,
    endDate: string,
    category: CategoryType,
    amount: number

}


export default class addCoupon extends Component<any, AddCouponState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            couponName: "",
            price: 0,
            description: "",
            startDate: "",
            endDate: "",
            category: null,
            amount: 0,

        };
    }

    private setCouponName = (args: ChangeEvent<HTMLInputElement>) => {

        const couponName = args.target.value;
        this.setState({ couponName });
    }

    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        const price = +args.target.value;
        this.setState({ price });
    }
    private setDescription = (args: ChangeEvent<HTMLInputElement>) => {

        const description = args.target.value;
        this.setState({ description });
    }

    private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
        const startDate = args.target.value;
        this.setState({ startDate });
    }

    private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        const endDate = args.target.value;
        this.setState({ endDate });
    }

    private setCategory = (args: ChangeEvent<HTMLInputElement>) => {
        const category = CategoryType[args.target.value];
        this.setState({ category });
    }

    private setAmount = (args: ChangeEvent<HTMLInputElement>) => {
        const amount = +args.target.value;
        this.setState({ amount });
    }


    private addCoupon = async () => {

        try {
            let coupon = new Coupon(null, this.state.couponName, this.state.description
                , this.state.startDate, this.state.endDate, this.state.category,
                this.state.amount, this.state.price);
            console.log(coupon);
            const response = await axios.post<Number>("http://localhost:8080/coupons", coupon);
            const serverResponse = response.data;
            alert("Successful add coupon! the coupon id is: " + serverResponse);
            this.props.history.push('/company');
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }


    public render() {
        return (
            <div className="add-coupon">
                <br /><br />
                <span className="div1">
                    <span className="all-writing">
                        coupon name: <br /><br />
                price: <br /><br />
                description: <br /><br />
                start date:
                </span>
                    <span className="inputs">
                        <input type="text" name="couponName"
                            onChange={this.setCouponName} /><br /><br />
                        <input type="number" name="price"
                            onChange={this.setPrice} /><br /><br />
                        <input type="text" name="description"
                            onChange={this.setDescription} /><br /><br />
                        <input type="text" name="startDate"
                            onChange={this.setStartDate} />
                    </span>
                </span>
                <span className="div2">
                    <span className="all-writing2">
                        end date: <br /><br />
                category:<br /><br />
                anount:
                </span>
                    <span className="inputs2">
                        <input type="text" name="endDate"
                            onChange={this.setEndDate} /><br /><br />
                        <input type="text" name="category"
                            onChange={this.setCategory} /><br /><br />

                        <input type="number" name="amount"
                            onChange={this.setAmount} />
                    </span>
                </span>
                <br /><br />

                <input type="button" value="add coupon" onClick={this.addCoupon} />

            </div>
        );
    }



}
