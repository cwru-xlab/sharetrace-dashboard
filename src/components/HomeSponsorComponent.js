import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
var config = require('../config');


class HomeSponsor extends Component{

    constructor(props){
        super(props);

        this.state = {
            sponsors: [],
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        fetch(config.serverUrl+'/home/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                sponsors: data.user.sponsors 
            })
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){

        return(
            <div className="container" style={{minHeight: "550px"}}>
                <div className="row" style={{marginTop: "200px",marginBottom: "150px"}}>
                    <div className="col-6">
                        <Link to={'/usersList'} >
                            <CardImg style={{width:"60%",marginTop:"5%"}} src={baseUrl+"/assets/images/homepage_sponsor_users.png"} alt="All Users List" />
                            <CardImgOverlay style={{borderStyle: "solid", borderWidth: "1px",borderColor: "#D7D7D7", borderRadius: "10px",width: "60%"}}>
                                <CardTitle style={{fontFamily: "Arial Black", color: "black", marginTop: "-30px", backgroundColor:"white", width: "60%"}}><center>All Users List</center></CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to={'/respondentsList'}>
                            <CardImg style={{width:"60%",marginTop:"5%", marginBottom: "5%", marginLeft: "3%", marginRight: "3%"}} src={baseUrl+"/assets/images/homepage_sponsor_respondents.png"} alt="Respondents List" />
                            <CardImgOverlay style={{borderStyle: "solid", borderWidth: "1px",borderColor: "#D7D7D7", borderRadius: "10px",width: "70%"}}>
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