import axios from "axios";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../models/User";
import "./UserDetails.css";


interface UserDetailsState {
  user: User;
  isCompany: boolean;
}
export default class UserDetails extends Component<any, UserDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: new User(null, null, null, null, null, null),
      isCompany: false
    };

  }


  public async componentDidMount() {
    try {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const id = this.props.match.params.id;
      const response = await axios.get<User>("http://localhost:8080/users/" + id);
      this.setState({ user: response.data });
      const userType = sessionStorage.getItem("userType");
      if (userType == "COMPANY") {
        this.setState({ isCompany: true });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  private delete = async () => {

    try {
      const id = this.props.match.params.id;
      const response = await axios.delete("http://localhost:8080/users/" + id);
      this.setState({ user: response.data });
      alert("User was successfuly deleted");
      this.props.history.push('/users');


    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }


  public render() {
    let id = this.props.match.params.id;
    return (
      <div className="user-details">
        <br /><br />
          user name: {this.state.user.userName} <br /><br />
          user id: {this.state.user.id}<br /><br />
          first name: {this.state.user.firstName} <br /><br />
          last name: {this.state.user.lastName} <br /><br />
        {this.state.isCompany
          && <span className="company-id"> companyId: {this.state.user.companyId}</span>}
        <br /> <br />
        <span className="buttons">
          <input type="button" value="delete" onClick={this.delete} />
        </span>
        <NavLink to={"/updateUser/" + id} className="buttons">
          <input type="button" value="update user" />
        </NavLink>
      </div>
    );
  }
}