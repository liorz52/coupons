import axios from "axios";
import { ChangeEvent } from "react";
import { Component } from "react";
import { User } from "../../models/User";
import "./UpdateUser.css";

interface UpdateUserState {
    password: string;
    firstName: string;
    lastName: string;
}
export default class UpdateUser extends Component<any, UpdateUserState> {

    constructor(props: any) {
        super(props);
        this.state = {
            password: "",
            firstName: "",
            lastName: ""
        };
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



    private updateUser = async () => {

        try {
            const id = this.props.match.params.id;
            const user = await axios.get<User>("http://localhost:8080/users/" + id);
            let userName = user.data.userName;
            let userType = user.data.userType;
            let companyId = user.data.companyId;
            let user1 = new User(userName, this.state.password, this.state.firstName, this.state.lastName, userType, id, companyId);
            console.log(user1);
            const response = await axios.put("http://localhost:8080/users", user1);
            alert("Successful update user! ");
            if (sessionStorage.getItem("userType") == "Admin") {
                this.props.history.push('/users');

            } else if (sessionStorage.getItem("userType") == "Company") {
                this.props.history.push('/Company');
            } else {
                this.props.history.push('/Customer');
            }
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }


    public render() {
        return (
            <div className="update-user">
                <br /><br />
                <span className="all-writing">
                    password: <br /> <br />
                    first name: <br /> <br />
                    last name:
                    </span>
                <span className="inputs">
                    <input type="password" name="password"
                        onChange={this.setPassword} /><br /><br />
                    <input type="text" name="firstName"
                        onChange={this.setFirstName} /><br /><br />
                    <input type="text" name="lastName"
                        onChange={this.setLastName} />
                </span>
                <br /><br />

                <input type="button" value="update user" onClick={this.updateUser} />

            </div>
        );
    }
}