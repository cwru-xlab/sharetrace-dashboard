import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
var config = require('../config');

class EditRespondent extends Component{

    constructor(props){
        super(props);

        this.state = {
            // activities: [],
            // all_activities: []
            //For test
            activities:[
                {
                    name: "activity_1",
                    completed: "Completed"
                },
                {
                    name: "activity_2",
                    completed: "Incompleted"
                }
            ],
            all_activities: ["activity_1", "activity_2", "activity_3", "activity_4"]
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(config.serverUrl+'/editRespondent/'+this.props.username+'/'+this.props.location.state.respondent, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                activities: data.activities,
                all_activities: data.all_activities.split(',')
            })
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let databody = {
            respondent: this.props.location.state.respondent,
            activities: this.state.activities
        }
        fetch(config.serverUrl+'/editRespondent/'+this.props.username, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/homeSponsor');
            else
                alert(JSON.stringify(data.err));
        })
    }

    add(){
        this.setState({activities: [...this.state.activities, ""]});
    }

    remove(index){
        this.state.activities.splice(index, 1);
        this.setState({activities: this.state.activities});
    }

    handleChange(event, index){
        this.state.activities[index] = {name: event.target.value, completed: "Incompleted"};
        this.setState({activities: this.state.activities});
    }

    handleRemoveRespondent(event){
        event.preventDefault();
        let databody = {
            respondent: this.props.location.state.respondent
        }
        fetch(config.serverUrl+'/editRespondent/'+this.props.username, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/homeSponsor');
            else
                alert(JSON.stringify(data.err));
        })
    }

    render(){
        return(
            <div className="container">
                <br />
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/homeSponsor">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/respondentsList">Respondents List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Edit</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Respondent <em>{this.props.location.state.respondent}</em></h5>
                    </div>
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-6 col-md-3 offset-md-3">
                        <p style={{fontFamily: "Arial"}}>Username: </p>
                    </div>
                    <div className="col-6 col-md-3">
                        <p style={{fontFamily: "Arial"}}>{this.props.location.state.respondent}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-md-3 offset-md-3">
                        <p style={{fontFamily: "Arial"}}>Data Debit Time Remaining: </p>
                    </div>
                    <div className="col-6 col-md-3">
                        <p style={{fontFamily: "Arial"}}>{this.props.location.state.time_remaining}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-md-6 offset-md-3" style={{borderStyle:"solid",borderColor: "#D7D7D7", borderWidth:"1px", borderRadius:"5px"}}>
                        <div className="col-12">
                            <h6 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Activities</h6>
                        </div>
                        <div className="col-12">
                            <hr className="seperation" />
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="activities"></Label>
                                {
                                    this.state.activities.map((activity, index) => {
                                        return(
                                            <div key={index} className="row">
                                                {activity !== "" && <p className="col-12 col-md-8 offset-md-1">{activity.name}: {activity.completed}</p>}
                                                {activity === "" && <select className="col-12 col-md-8 offset-md-1" style={{border:"1px solid #D7D7D7", marginTop:"5px", borderRadius:"5px"}} value={activity.name} onChange={(e) => this.handleChange(e, index)}>
                                                    <option selected>Choose an activity</option>
                                                    {
                                                        this.state.all_activities.map((one_activity) => {
                                                            return(
                                                                <option value={one_activity}>{one_activity}</option>
                                                            )
                                                        })
                                                    }
                                                </select>}
                                                {activity.completed === "Incompleted" && <Button style={{background:"none", color:"#90999e", border:"none", textDecorationLine: "underline", fontSize:"10px"}} onClick={() => this.remove(index)}>Remove</Button>}
                                            </div>
                                        );
                                    })
                                }
                                <br />
                                <Row>
                                    <Col sm={12} md={{size: 6, offset: 1}}>
                                        <FormGroup style={{display:"inline-block", width: "50%"}}>
                                            <Button type="submit" value="submit" style={{color:"black", width:"100%", borderColor:"#D7D7D7", backgroundColor:"white", fontFamily:"Arial", fontSize:"12px"}}><i class="fa fa-paper-plane" aria-hidden="true"></i>Submit</Button>
                                        </FormGroup>
                                        <FormGroup style={{display:"inline-block"}}>
                                            <Button style={{background:"none", color:"#327ba8", border:"none", textDecorationLine: "underline", fontSize:"10px", marginBottom:"-15px"}} onClick={() => this.add()}><center>Add</center></Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-6 col-md-6 offset-md-3">
                        <br />
                        <Form onSubmit={this.handleRemoveRespondent}>
                            <FormGroup>
                                <Button type="submit" value="submit" style={{color:"black", width:"100%", borderColor:"#D7D7D7", backgroundColor:"white", fontFamily:"Arial"}}><i class="fa fa-user-times" aria-hidden="true"></i> Remove from Respondents List</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default EditRespondent;