import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Card.css"

interface cardProps {
    id: number;
    couponName: string;
    description: string;
    price?: number;
    // image:string;

}
export default class Card extends Component<cardProps>{
    public constructor(props: any) {
        super(props);
    };


    public render() {
        return (

            <NavLink to={"/couponDetails/" + this.props.id}>
                <div className="cardDiv">
                    {/* <img src={this.props.image}></img> */}
                id: {this.props.id} <br />
                name: {this.props.couponName} <br />
                description: {this.props.description}  <br />
                price: {this.props.price}
                </div>
            </NavLink>

        )
    }
}