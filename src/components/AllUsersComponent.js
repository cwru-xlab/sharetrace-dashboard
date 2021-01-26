import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class AllUser extends Component{

    render(){
        return(
            <div className="container">
                <br />
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/homeSponsor">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>All Users List</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>All Users List</h5>
                    </div>
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                </div>
            </div>
        );
    }

}

export default AllUser;