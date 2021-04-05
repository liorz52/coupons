import axios from "axios";

import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Company } from "../../models/Company";
import "./CompanyDetails.css";

interface CompanyDetailsState {
  company: Company;

}
export default class CompanyDetails extends Component<any, CompanyDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      company: new Company(null, "", "", "")
    };

  }

  public async componentDidMount() {
    try {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const id = this.props.match.params.id;
      const response = await axios.get<Company>("http://localhost:8080/companies/" + id);
      this.setState({ company: response.data });
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  }

  private delete = async () => {

    try {
      const id = this.props.match.params.id;
      const response = await axios.delete("http://localhost:8080/companies/" + id);
      this.setState({ company: response.data });
      alert("company was successfuly deleted");
      this.props.history.push('/companies');
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }

  public render() {
    let id = this.props.match.params.id;
    return (
      <div className="company-details">
        <br />
          company name: {this.state.company.companyName} <br /><br />
          address: {this.state.company.address} <br /><br />
          phone number: {this.state.company.phoneNumber}<br /> <br />


        <NavLink to={"/updateCompany/" + id} className="buttons">
          <input type="button" value="update company" />
        </NavLink>

        <span className="buttons"> <input type="button" value="delete" onClick={this.delete} /> </span>


      </div>
    );
  }
}