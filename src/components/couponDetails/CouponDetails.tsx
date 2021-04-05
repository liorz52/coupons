import axios from 'axios';
import React from 'react';
import { ChangeEvent } from 'react';
import { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Coupon } from '../../models/Coupon';
import { Purchase } from '../../models/Purchase';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import { User } from '../../models/User';
import { UserType } from '../../models/UserType';
import Card from '../card/Card';
import "./CouponDetails.css";


interface CouponsDetailsState {
  coupon: Coupon;
  isAdminOrCompany: boolean;
}
export default class CouponDetails extends Component<any, CouponsDetailsState> {

  private purchaseAmount: number;


  constructor(props: any) {
    super(props);
    this.state = {
      coupon: new Coupon(null, "", ""), isAdminOrCompany: false

    };

  }

  public async componentDidMount() {
    try {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const id = this.props.match.params.id;
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
      this.setState({ coupon: response.data });
      const userType = sessionStorage.getItem("userType");
      if (userType == "ADMIN" || userType == "COMPANY") {
        this.setState({ isAdminOrCompany: true });
      }
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }

  private delete = async () => {

    try {
      const id = this.props.match.params.id;
      const response = await axios.delete("http://localhost:8080/coupons/" + id);
      this.setState({ coupon: response.data });
      alert("Coupon was successfuly deleted");
      this.props.history.push('/admin');


    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }
  private onPurchaseAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.purchaseAmount = +event.target.value;
  }

  private toDate(strDate: string): string {
    let date = new Date(strDate);
    return date.toDateString();
  }

  private purchase = async () => {

    try {
      const couponId = this.props.match.params.id;
      let purchase = new Purchase(null, null, couponId, null, this.purchaseAmount, null)
      const response = await axios.post<number>("http://localhost:8080/purchases", purchase);
      const serverResponse = response.data;
      alert("Successful purchase! Your purchase id is: " + serverResponse);
      this.props.history.push('/customer');
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }


  public render() {
    let id = this.props.match.params.id;
    return (
      <div className="coupon-details">
        <br />
        Category: {this.state.coupon.category}<br /><br />
        Name: {this.state.coupon.couponName} <br /><br />
        Description: {this.state.coupon.description} <br /><br />
        Price: {this.state.coupon.price} <br /><br />
        {/* <h1>Amount: {this.state.coupon.amount}</h1> <br /> */}
        Start date: {this.toDate(this.state.coupon.startDate)} <br /><br />
        End date: {this.toDate(this.state.coupon.endDate)}<br /><br />

        {!this.state.isAdminOrCompany
          && <span>how many i want: <br /></span>}<br />
        {!this.state.isAdminOrCompany
          && <input type="number" onChange={this.onPurchaseAmountChanged} />}
        {!this.state.isAdminOrCompany
          && <span className="purchase-button">
            <input type="button" value="purchase" onClick={this.purchase} />
          </span>}
        {this.state.isAdminOrCompany
          && <aside >  <span className="delete-coupon">
            <input type="button" value="delete" onClick={this.delete} />
          </span>
            <NavLink to={"/updateCoupon/" + id}>
              <span className="updateCoupon">
                <input type="button" value="update coupon" />
              </span>
            </NavLink>

          </aside>}

      </div>
    );
  }
}

