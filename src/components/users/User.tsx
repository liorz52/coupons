import axios from "axios";
import React from "react";
import { Component } from "react";
import { User } from "../../models/User";
import "./User.css"



interface UsersState {
    users: User[];
    userNameFilter: String;

}
export default class Users extends Component<any, UsersState>{

    public constructor(props: any) {
        super(props);
        this.state = { users: [], userNameFilter: "" };
    }

    private async delete(id: number) {

        try {
            await axios.delete("http://localhost:8080/users/" + id);
            this.componentDidMount();
            alert("User was successfuly deleted");
            this.props.history.push('/users');
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }


    public onUsersPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ userNameFilter: text });
    }


    public async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            const response = await axios.get<User[]>("http://localhost:8080/users");
            this.setState({ users: response.data });

        } catch (error) {
            alert(error.response.data.errorMessage);
        }

    }


    public render() {
        return (
            <div className="Users">

                <br /> <br />
                Search by user name:<input type="text" onChange={this.onUsersPipeChanged} />
                <br /> <br />

                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User name</th>
                            <th>First name</th>
                            <th>Last name </th>
                            <th>Company id </th>
                            <th>Delete user </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.filter(user => {
                            if (this.state.userNameFilter == "") {
                                return true;
                            }
                            return user.userName.toLowerCase().includes(this.state.userNameFilter.toLowerCase());
                        }).map((user) => (
                            <tr>
                                <td> {user.id} </td>
                                <td> {user.userName} </td>
                                <td> {user.firstName} </td>
                                <td> {user.lastName} </td>
                                <td> {user.companyId} </td>
                                <td> <input type="button" value="delete" onClick={() => this.delete(user.id)} /></td>
                            </tr>

                        )
                        )}
                    </tbody>
                </table>
            </div >

        )
    }

}

