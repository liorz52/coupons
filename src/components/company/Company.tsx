import axios from "axios";
import React, { Component } from "react";
import { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { Coupon } from "../../models/Coupon";
import Card from "../card/Card";
import "./Company.css";

interface CompanyState {
    coupons: Coupon[];
    couponNameFilter: string;
    categoryFilter: string;
    maxPriceFilter: number;

}
export default class Company extends Component<any, CompanyState>{

    public constructor(props: any) {
        super(props);
        this.state = { coupons: [], couponNameFilter: "", categoryFilter: "", maxPriceFilter: 0 };
    }
    public onCategorySelected = (event: ChangeEvent<HTMLSelectElement>) => {
        let text = event.target.value;
        this.setState({ categoryFilter: text });
    }

    public onMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
        let price = + event.target.value;
        this.setState({ maxPriceFilter: price });
    }
    public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ couponNameFilter: text });
    }

    async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byCompanyIdForCompany");
            this.setState({ coupons: response.data });


        } catch (error) {
            console.log(error.response.data.errorMessage);
        }

    }
    public render() {
        return (
            <div className="company">
                <br />   <br />
                <NavLink to={"/addCoupon"} className="add">
                    <input type="button" value="add coupon" />
                </NavLink>
                <br />   <br /><br />
                <span className="search">  Search by name: </span><input type="text" onChange={this.onCouponsPipeChanged} />

                <span className="category">category:</span> <select className="select" onChange={this.onCategorySelected}>
                    <option className="category"> </option>
                    <option className="category"> FACE </option>
                    <option className="category"> BODY </option>
                    <option className="category"> EYES </option>
                </select>
                <span className="max-price">Max price: </span><input className="max-price-input" type="number" onChange={this.onMaxPrice} />



                <br /> <br />
                {<div>
                    {this.state.coupons.filter(coupon => {
                        if (this.state.couponNameFilter == "") {
                            return true;
                        }
                        return coupon.couponName.toLowerCase().includes(this.state.couponNameFilter.toLowerCase());
                    })
                        .filter(coupon => {
                            if (this.state.categoryFilter == "") {
                                return true;
                            }
                            return coupon.category.includes(this.state.categoryFilter);
                        })

                        .filter(coupon => {
                            if (this.state.maxPriceFilter == 0) {
                                return true;
                            }
                            return coupon.price <= (this.state.maxPriceFilter);
                        })
                        .map((coupon) => (<Card key={coupon.id} {...coupon} />))}


                </div>}
            </div >

        )
    }

}