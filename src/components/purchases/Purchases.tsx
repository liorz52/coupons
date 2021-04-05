import axios from "axios";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Purchase } from "../../models/Purchase";
import "./Purchases.css";

interface PurchasesState {
    purchases: Purchase[];

}
export default class Purchases extends Component<any, PurchasesState>{

    public constructor(props: any) {
        super(props);
        this.state = { purchases: [] };
    }

    async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            let response;
            if (sessionStorage.userType === "ADMIN") {
                response = await axios.get<Purchase[]>("http://localhost:8080/purchases");
            }
            else if (sessionStorage.userType === "COMPANY") {
                response = await axios.get<Purchase[]>("http://localhost:8080/purchases/byCompanyIdForCompany");
            }
            else {
                response = await axios.get<Purchase[]>("http://localhost:8080/purchases/byUserIdForCustomer");
            }

            this.setState({ purchases: response.data });


        } catch (error) {
            console.log("THE ERROR " + error);
            alert(error.response.data.errorMessage);
        }

    }

    private toDate(strDate: string): string {
        let date = new Date(strDate);
        return date.toDateString();
    }

    public render() {
        return (
            <div className="Purchases">
                <br />  <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User id</th>
                            <th>Coupon id</th>
                            <th>Coupon name</th>
                            <th>Amount</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.purchases.map(purchase => (
                            <tr>
                                <td><NavLink to={"/purchaseDetails/" + purchase.id}>
                                    {purchase.id}
                                </NavLink></td>
                                <td> {purchase.userId} </td>
                                <td> {purchase.couponId} </td>
                                <td> {purchase.couponName} </td>
                                <td> {purchase.amount} </td>
                                <td> {this.toDate(purchase.timestamp)} </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div >

        )
    }

}