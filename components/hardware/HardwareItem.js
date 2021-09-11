import React from 'react'
import Link from 'next/link'
import { to_capital_case,addComma } from '../../utils/toCapitalCase';
import {format} from "timeago.js";

export default function HardwareItem({item}) {
    // console.log(item);
    const userLink = () =>{
        return(
            <>
                <Link href={`item/${item._id}`}>
                <a className="btn btn-info">View Listing</a>
                </Link>
            </>
        )
    }
    
    return (
        <div className="card mb-4" style={{width: "70rem"}}>
            <img src={item.images[0].url} className="card-img-top" alt={item.images[0].url} style={{height: "20rem"}}/>
            <div className="card-body">
                <h5 className="card-title"  title={item.title}>{item.title.toUpperCase()} |
                
                {
                    (item.location!= "")
                    ? <span style={{color: "#4267B2"}}> {to_capital_case(item.location)} </span>
                    : <span style={{color: "#4267B2"}}> Location is not available </span>
                }
                     <h5 style={{color: "grey"}}> {format(item.createdAt)}</h5>
                </h5>
                <div className="d-flex flex-row bd-highlight mb-1">
                <span className="d-flex justify-content-start" style={{fontFamily:"'Kameron', serif"}}><span style={{fontWeight: "900"}}>৳</span >{addComma(item.price)}</span>
                
                </div>
                {
                    (item.available===true)
                    ? <subtitle className="text-success d-flex"> Item is available</subtitle>
                    : <subtitle className="text-danger d-flex "> Item is not available</subtitle>
                }
                <p className="card-text">{item.description}</p>
                <div className="row justify-content-center">
                    {userLink()}
                </div>
            </div>
        </div>
    )
}
