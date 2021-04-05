import axios from "axios";
import { Component } from "react";
import { Purchase } from "../../models/Purchase";
import "./PurchaseDetails.css";

interface PurchaseDetailsState {
    purchase: Purchase;
    isAdminOrCompany: boolean;
}
export default class PurchaseDetails extends Component<any, PurchaseDetailsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            purchase: new Purchase(null, null, null, null, null, null), isAdminOrCompany: false
        };

    }

    public async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const id = this.props.match.params.id;
            const response = await axios.get<Purchase>("http://localhost:8080/purchases/" + id);
            this.setState({ purchase: response.data });
            const userType = sessionStorage.getItem("userType");
            if (userType == "ADMIN" || userType == "COMPANY") {
                this.setState({ isAdminOrCompany: true });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    private delete = async () => {

        try {
            const id = this.props.match.params.id;
            const response = await axios.delete("http://localhost:8080/purchases/" + id);
            this.setState({ purchase: response.data });
            alert("purchase was successfuly deleted");
            this.props.history.push('/purchases')

        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }
    private toDate(strDate: string): string {
        let date = new Date(strDate);
        return date.toDateString();
    }


    public render() {
        return (
            <div className="purchase-details">
                <br /> <br /> <br />

                id: {this.state.purchase.id} <br /><br />
                coupon id: {this.state.purchase.couponId} <br /><br />
                coupon name: {this.state.purchase.couponName}<br /><br />
                amount: {this.state.purchase.amount} <br /><br />
                {this.state.isAdminOrCompany && <div>
                    user id: {this.state.purchase.userId}  </div>} <br />
                timastamp: {this.toDate(this.state.purchase.timestamp)} <br /> <br />
                {this.state.isAdminOrCompany
                    && <input type="button" value="delete" onClick={this.delete} />}

            </div>
        );
    }
}