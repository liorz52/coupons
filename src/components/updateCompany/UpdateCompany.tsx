import axios from "axios";
import { ChangeEvent, Component } from "react";
import { Company } from "../../models/Company";
import "./UpdateCompany.css";


interface UpdateCompanyState {
    address: string;
    phoneNumber: string;
}
export default class UpdateCompany extends Component<any, UpdateCompanyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            address: "",
            phoneNumber: ""
        };
    }

    private setAddress = (args: ChangeEvent<HTMLInputElement>) => {
        const address = args.target.value;
        this.setState({ address });
    }
    private setPhoneNumber = (args: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = args.target.value;
        this.setState({ phoneNumber });
    }
    private updateCompany = async () => {

        try {
            const id = this.props.match.params.id;
            const company1 = await axios.get<Company>("http://localhost:8080/companies/" + id);
            const companyName = company1.data.companyName;
            let company = new Company(id, companyName, this.state.address, this.state.phoneNumber);
            console.log(company);
            const response = await axios.put("http://localhost:8080/companies", company);
            alert("Successful update company! ");
            this.props.history.push('/companies');
        } catch (err) {
            alert(err.response.data.errorMessage);
            console.log(JSON.stringify(err));
        }
    }


    public render() {
        return (
            <div className="update-company">
                <br /><br />
                <span className="all-writing">
                    address: <br /> <br />
                    phone-number:
                    </span>
                <span className="inputs">
                    <input type="text" name="address"
                        onChange={this.setAddress} /><br /><br />
                    <input type="text" name="phoneNumber"
                        onChange={this.setPhoneNumber} />
                </span>
                <br /><br /><br />

                <input type="button" value="update company" onClick={this.updateCompany} />

            </div>
        );
    }
}
