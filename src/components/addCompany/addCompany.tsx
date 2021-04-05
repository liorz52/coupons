import axios from "axios";
import { ChangeEvent, Component } from "react";
import { Company } from "../../models/Company";
import "./addCompany.css";


interface AddCompanyState {
    companyName: string,
    address: string,
    phoneNumber: string,

}


export default class addCompany extends Component<any, AddCompanyState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            companyName: "",
            address: "",
            phoneNumber: ""
        };
    }

    private setCompanyName = (args: ChangeEvent<HTMLInputElement>) => {

        const companyName = args.target.value;
        this.setState({ companyName });
    }

    private setAddress = (args: ChangeEvent<HTMLInputElement>) => {
        const address = args.target.value;
        this.setState({ address });
    }
    private setPhoneNumber = (args: ChangeEvent<HTMLInputElement>) => {

        const phoneNumber = args.target.value;
        this.setState({ phoneNumber });
    }

   

    private addCompany = async () => {

        try {
           let company= new Company(null,this.state.companyName,this.state.address,this.state.phoneNumber);
            console.log(company);
            const response = await axios.post<Number>("http://localhost:8080/companies", company);
            const serverResponse = response.data;
            alert("Successful add company! the company id is: " + serverResponse);
            this.props.history.push('/companies');
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }


    public render() {
        return (
           
            <div className="addCompany">
             <br/> <br/> 
                    <span className="all-writing"> 
                    company name: <br/> <br/> 
                    address: <br/> <br/> 
                    phone-number: 
                    </span>
                    <span className="inputs"> 
                    <input type="text" name="companyName"
                    onChange={this.setCompanyName} /><br /><br />
                    <input type="text" name="address"
                    onChange={this.setAddress} /><br /><br />
                    <input type="text" name="phoneNumber"
                    onChange={this.setPhoneNumber} />
                    </span>
                    <br /><br />


                <input type="button" value="add company" onClick={this.addCompany} />
            </div>
        );
    }



}
