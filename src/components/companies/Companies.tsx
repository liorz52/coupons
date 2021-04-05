import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Company } from "../../models/Company";
import "./Companies.css"


interface CompaniesState {
    companies: Company[];
    companyNameFilter: String;

}
export default class Companies extends Component<any, CompaniesState>{

    public constructor(props: any) {
        super(props);
        this.state = { companies: [], companyNameFilter: "" };
    }

    public onCompaniesPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ companyNameFilter: text });
    }

    async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<Company[]>("http://localhost:8080/companies/forAdmin");
            this.setState({ companies: response.data });


        } catch (error) {
            alert(error.response.data.errorMessage);
        }

    }

    public render() {
        return (
            <div className="Companies">
                <br /> <br />

                Search by name :<input type="text" onChange={this.onCompaniesPipeChanged} />

                <br /> <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.filter(company => {
                            if (this.state.companyNameFilter == "") {
                                return true;
                            }
                            return company.companyName.toLowerCase().includes(this.state.companyNameFilter.toLowerCase());
                        }).map((company) => (
                            <tr>
                                <td> {company.id} </td>
                                <td><NavLink to={"/companyDetails/" + company.id}>
                                    {company.companyName}
                                </NavLink></td>
                                <td> {company.address} </td>
                                <td> {company.phoneNumber} </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <br /> <br />  <NavLink to={"/addCompany"} className="add-button">
                    <input type="button" value="add company" />
                </NavLink>

            </div >

        )
    }


}
