import axios from "axios";
import { ChangeEvent } from "react";
import { Component } from "react";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import { User } from "../../models/User";
import { UserType } from "../../models/UserType";
import "./Register.css";

interface RegisterState {
    userName: string,
    password: string,
    firstName: string,
    lastName: string

}
export default class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            firstName: "",
            lastName: ""
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
    private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {

        const firstName = args.target.value;
        this.setState({ firstName });
    }

    private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
        const lastName = args.target.value;
        this.setState({ lastName });
    }
    private register = async () => {

        try {
            let user = new User(this.state.userName, this.state.password, this.state.firstName, this.state.lastName);
            console.log(user);
            user.userType = UserType.CUSTOMER;
            const response = await axios.post<Number>("http://localhost:8080/users", user);
            const serverResponse = response.data;
            alert("Successful registration! Your user id is: " + serverResponse);
            this.props.history.push('/home');
        } catch (err) {
            alert(err.response.data.errorMessage);
            console.log(JSON.stringify(err));
        }
    }



    public render() {
        return (
            <div className="register">
                <br /> <br />
                <span className="all-writing">
                    user name:<br /><br />
            password:<br /><br />
            first name:<br /><br />
            last name:
            </span>
                <span className="inputs">
                    <input type="text" name="userName"
                        onChange={this.setUserName} /><br /><br />
                    <input type="password" name="password"
                        onChange={this.setPassword} /><br /><br />
                    <input type="text" name="firstName"
                        onChange={this.setFirstName} /><br /><br />
                    <input type="text" name="lastName"
                        onChange={this.setLastName} />
                </span>
                <br /><br />

                <input type="button" value="register" onClick={this.register} />
            </div>
        );
    }














}


