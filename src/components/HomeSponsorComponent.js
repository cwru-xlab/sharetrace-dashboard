import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
var config = require('../config');


class HomeSponsor extends Component{

    render(){

        return(
            <div className="container" style={{minHeight: "550px"}}>
                <div className="row" style={{marginTop: "200px",marginBottom: "150px"}}>
                    <div className="col-12 col-md-6" style={{marginBottom: "70px"}}>
                        <Link to={'/usersList'} >
                            <CardImg style={{width:"60%",marginTop:"50px"}} src={baseUrl+"/assets/images/homepage_sponsor_users.png"} alt="All Users List" />
                            <CardImgOverlay style={{borderStyle: "solid", borderWidth: "1px",borderColor: "#D7D7D7", borderRadius: "10px",width: "70%", height:"350px"}}>
                                <CardTitle style={{fontFamily: "Arial Black", color: "black", marginTop: "-30px", backgroundColor:"white", width: "80%"}}><center>All Users List</center></CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <Link to={'/respondentsList'}>
                            <CardImg style={{width:"60%",marginTop:"50px", marginBottom: "5%", marginLeft: "3%", marginRight: "3%"}} src={baseUrl+"/assets/images/homepage_sponsor_respondents.png"} alt="Respondents List" />
                            <CardImgOverlay style={{borderStyle: "solid", borderWidth: "1px",borderColor: "#D7D7D7", borderRadius: "10px",width: "70%", height:"350px"}}>
                                <CardTitle style={{fontFamily: "Arial Black", color: "black", marginTop: "-30px", backgroundColor:"white", width: "80%"}}><center>Respondents List</center></CardTitle>
                            </CardImgOverlay>	
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeSponsor;