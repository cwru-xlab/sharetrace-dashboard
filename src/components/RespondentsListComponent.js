import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class RespondentsList extends Component{

    constructor(props){
        super(props);
        this.state = {
            // users: []
            // Below is for test
            users: [
                {
                    username: "bb-8",
                    time_remaining: "6 days"
                },
                {
                    username: "bb-9",
                    time_remaining: "12 days"
                }
            ]
        }
    }

    componentDidMount(){
        fetch(config.serverUrl+'/respondentsList/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                this.setState({
                    users: data.users
                })
            }
            else
                alert(JSON.stringify(data.err));
        })
    }

    render(){

        const users = this.state.users.map((user) => {
            return(
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.time_remaining}</td>
                        <td>
                            <Link to={{ pathname: "/editRespondent" , state: { respondent: user.username, time_remaining: user.time_remaining } }} style={{ fontFamily:"Arial Black"}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</Link>
                        </td>
                    </tr>
            );
        })

        return(
            <div className="container" style={{minHeight: "750px"}}>
                <br />
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/homeSponsor">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Respondents List</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Respondents List</h5>
                    </div>
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                </div>
                    <table id="debit">
                        <tr>
                            <th>Username</th>
                            <th>Time Remaining</th>
                            <th>Edit</th>
                        </tr>
                        {users}
                    </table>
                <br />
            </div>
        );
    }

}

export default RespondentsList;