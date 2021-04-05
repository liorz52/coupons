import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { UserType } from '../../models/UserType';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./Menu.css";

interface IMenuState {
  isLoggedIn: boolean;
  userType: UserType;
}


export default class Menu extends Component<any, IMenuState> {


  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userType: null
    };
  }

  componentDidMount() {
    store.subscribe(() => this.setState({
      isLoggedIn: store.getState().isLoggedIn,
      userType: store.getState().userType
    })
    );
  }

  private logOut = async () => {
    try {
      await axios.post("http://localhost:8080/users/logOut");
      store.dispatch({ type: ActionType.LOGOUT })
    } catch (error) {
      alert(error.response.data.errorMessage);
      console.log(error);
    };
  }

  public render() {
    let id = sessionStorage.getItem("userId");
    return (
      <div className="menu">
        <NavLink to="/home" exact>Home</NavLink>


        {(store.getState().isLoggedIn == true && store.getState().userType == "ADMIN") &&
          <span className="menu">
            <NavLink to="/users" exact> Users</NavLink>
            <NavLink to="/companies" exact>Companies</NavLink>

            <NavLink to="/admin" exact>Coupons</NavLink>
          </span>}
        {(store.getState().isLoggedIn == true && store.getState().userType == "COMPANY") &&
          <NavLink to="/company" exact>Coupons</NavLink>}
        {(store.getState().isLoggedIn == true && store.getState().userType == "CUSTOMER") &&
          <NavLink to="/customer" exact>Coupons</NavLink>}
        {store.getState().isLoggedIn == true &&
          <span className="menu" >
            <NavLink to="/purchases" exact>Purchases</NavLink>
            <NavLink to={"/userDetails/" + id} exact>Account</NavLink>
            <span className="menu">
            <NavLink to="/home" exact >
              <input type="button" value="Log out" onClick={this.logOut} />
            </NavLink></span>
          </span>}

      </div>
    );
  }
}