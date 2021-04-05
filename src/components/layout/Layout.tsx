import axios from 'axios';
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';

import addCompany from '../addCompany/addCompany';
import addCoupon from '../addCoupon/AddCoupon';
import Admin from '../admin/Admin';
import Companies from '../companies/Companies';
import Company from '../company/Company';
import CompanyDetails from '../companyDetails/CompanyDetails';
import CouponDetails from '../couponDetails/CouponDetails';
import Customer from '../customer/Customer';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import Purchases from '../purchases/Purchases';
import PurchaseDetails from '../purchaseDetails/PurchaseDetails';
import Register from '../register/Register';
import UpdateCompany from '../updateCompany/UpdateCompany';
import UpdateCoupon from '../updateCoupon/UpdateCoupon';
import UpdateUser from '../updateUser/UpdateUser';
import UserDetails from '../userDetails/UserDetails';
import Users from '../users/User';
import "./Layout.css";

interface ILayoutState{
  tokenUsed: boolean;
}

export default class Layout extends Component<any,ILayoutState> {
  public constructor(props: any){
    super(props);
    this.state={
      tokenUsed: false
    };
  }
  public componentDidMount =() =>{
    axios.defaults.headers.common["Authorization"]= sessionStorage.getItem("token");
    if (sessionStorage.getItem("isLoggedIn")==="1"){
      store.dispatch({type:ActionType.LOGIN, payload: sessionStorage.getItem("userType")});
    }
    this.setState({tokenUsed: true});
  }
  public render() {
    return (
      <BrowserRouter>
        <div className="layout">
          <header>  <Header /> </header> 
          <aside>   <Menu /> </aside>
          <main>
            <Switch>
         
              <Route path="/home" component={Login} exact  />
          {this.state.tokenUsed==true && 
          <aside className="layout">
              <Route path="/customer" component={Customer} exact />
              <Route path="/company" component={Company} exact />
              <Route path="/admin" component={Admin} exact />
              <Route path="/addCoupon" component={addCoupon} exact />
              <Route path="/addCompany" component={addCompany} exact />
              <Route path="/companies" component={Companies} exact />
              <Route path="/users" component={Users} exact />
              <Route path="/purchases" component={Purchases} exact />
              <Route path="/companyDetails/:id" component={CompanyDetails} exact />
              <Route path="/userDetails/:id" component={UserDetails} exact />
              <Route path="/updateUser/:id" component={UpdateUser} exact />
              <Route path="/updateCompany/:id" component={UpdateCompany} exact />
              <Route path="/updateCoupon/:id" component={UpdateCoupon} exact />
              <Route path="/couponDetails/:id" component={CouponDetails} exact />
              <Route path="/purchaseDetails/:id" component={PurchaseDetails} exact />
              <Route path="/register" component={Register} exact />
              {/* <Route path="/purchase" component={Purchase} exact /> */}
              {/* <Route component={PageNotFound} /> */}
              </aside>}
              <Redirect from="/" to="/home" exact />
            </Switch>
          </main>
          <footer> <Footer /> </footer>
        </div>
      </BrowserRouter >
    );

  }
}

