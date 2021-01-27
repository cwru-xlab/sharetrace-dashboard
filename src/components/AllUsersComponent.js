import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class AllUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            // users: [],
            // added: [],
            // removed: []
            // Below is for test
            users: [
                {
                    username: "bb-8",
                    respondent: true
                },
                {
                    username: "bb-9",
                    respondent: false
                }
            ],
            added: [false, false],
            removed: [false, false]
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount(){
        fetch(config.serverUrl+'/usersList/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                users: data.users,
                added: new Array(data.users.length).fill().map(() => false),
                removed: new Array(data.users.length).fill().map(() => false)
            })
        })
    }

    handleSubmit(event){
        let databody = {
            "users": this.state.users,
            "added": this.state.added,
            "removed": this.state.removed
        }
        fetch(config.serverUrl+'/usersList/'+this.props.username, {
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

    handleAdd(event, index){
        this.state.added[index] = event.target.checked;
        this.setState({added: this.state.added});
        alert(JSON.stringify(this.state.added));
    }

    handleRemove(event, index){
        this.state.removed[index] = event.target.checked;
        this.setState({removed: this.state.removed});
        alert(JSON.stringify(this.state.removed));
    }

    render(){

        const users = this.state.users.map((user, index) => {
            const isRespondent = user.respondent? true : false;
            return(
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.respondent.toString()}</td>
                        <td>
                            <label>
                                <input name="add" type="checkbox" disabled={isRespondent === true} checked={this.state.added[index]} onChange={(e) => this.handleAdd(e, index)} />
                            </label>
                        </td>
                        <td>
                            <label>
                                <input name="remove" type="checkbox" disabled={isRespondent === false} checked={this.state.removed[index]} onChange={(e) => this.handleRemove(e, index)} />
                            </label>
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
                        <BreadcrumbItem active>All Users List</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>All Users List</h5>
                    </div>
                    <div className="col-12">
                        <hr className="seperation" />
                    </div>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <table id="debit">
                            <tr>
                                <th>Username</th>
                                <th>Respondent</th>
                                <th>Add</th>
                                <th>Remove</th>
                            </tr>
                            {users}
                        </table>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                        <Col sm={6} md={{size: 2, offset:9}}>
                            <Button type="submit" value="submit" style={{background:"#169BD5", width:"100%", fontFamily:"Arial Black", border:"none"}}>
                                Confirm
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <br />
            </div>
        );
    }

}

export default AllUser;