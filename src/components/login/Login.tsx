import React, { Component } from 'react'
import { ChangeEvent } from 'react';
import axios from "axios";
import { UserLoginDetails } from '../../models/UserLoginDetails';
import "./Login.css";
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../models/UserType';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';



interface LoginState {
    userName: string,
    password: string
}
export default class Login extends Component<any, LoginState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {

        const userName = args.target.value;
        this.setState({ userName });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }



    private login = async () => {


        try {
            let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
            const serverResponse = response.data;
            let userType: UserType = serverResponse.userType as UserType;
            store.dispatch({ type: ActionType.LOGIN, payload: userType });
            sessionStorage.setItem("token", serverResponse.token);
            sessionStorage.setItem("userType", serverResponse.userType);
            sessionStorage.setItem("userId", String(serverResponse.userId));
            axios.defaults.headers.common['Authorization'] = serverResponse.token;
            console.log(serverResponse);
            store.dispatch({ type: ActionType.LOGIN, payload: serverResponse.userType });


            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin')
            }
            else if (serverResponse.userType === "CUSTOMER") {
                this.props.history.push('/customer')
            }
            else {
                this.props.history.push('/company')
            }
        }
        catch (err) {
            alert(err.response.data.errorMessage);
            console.log(JSON.stringify(err));
        }

    }

    public render() {
        return (
            <div className="login">
                <input type="text" placeholder="User name" name="userName"
                    value={this.state.userName} onChange={this.setUserName} /><br />
                <input type="password" placeholder="Password" name="password"
                    value={this.state.password} onChange={this.setPassword} /><br />
                <input type="button" value="login" onClick={this.login} /><br /><br /><br />


                <NavLink to={"/register"} className="text">
                    Not registered yet?
                     </NavLink>

            </div>
        );
    }
}

