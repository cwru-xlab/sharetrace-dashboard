import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback, Modal, ModalHeader, ModalBody} from 'reactstrap';
import Select from 'react-select';
var config = require('../config');

class Settings extends Component {
    
    constructor(props){

        super(props);

        this.state = {
            sponsors: [],
            oldPWD: '',
            newPWD: '',
            unsubscriptions: [],
            touched: {
                oldPWD: false,
                newPWD: false
            }
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangePWD = this.handleChangePWD.bind(this);
        this.handleUnsubscription = this.handleUnsubscription.bind(this);
    }

    componentDidMount() {
        fetch(config.serverUrl+'/settings/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                sponsors: data.sponsors
            })
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleMultiChange(event){

        var value = [];
        if(event != null){
            for(var i = 0;i < event.length;i++){
                value.push(event[i].value);
            }
        }
        this.setState({unsubscriptions: value});

    }

    handleChangePWD(event){

    }

    handleUnsubscription(event){

    }

    validate(oldPWD, newPWD){

        const errors = {
            pwd: ''
        }

        if(this.state.touched.newPWD && this.state.touched.oldPWD && oldPWD === newPWD)
            errors.pwd = 'New password cannot be the same as the old one!';
        
        return errors;
    }

    render() {

        const errors = this.validate(this.state.oldPWD, this.state.newPWD);
        const {unsubscription} = this.state;
        const options = this.state.sponsors.map((sponsor) => {
            return(
                <option value={sponsor.name}>{sponsor.name}</option>
            );
        });
        return(
            <div className="container" style={{minHeight: "725px"}}>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Settings</h5>
                    <hr className="seperation" />
                </div>
                <br />
                <div style={{borderStyle:"solid", borderWidth: "1px", borderRadius: "5px", borderColor:"#D7D7D7"}}>
                    {/* <Form onSubmit={this.handleChangePWD}>
                        <Row style={{marginTop: "15px", marginLeft: "10px", marginRight: "10px"}}>
                            <Col xs={12} md={9}>
                                <FormGroup>
                                    <Label style={{width: "30%", display:"inline-block"}} htmlFor="pwd">Reset your password</Label>
                                    <Input style={{width: "30%", display:"inline-block", marginLeft:"8px"}} type="text" id="oldPWD" name="oldPWD" placeholder="Old password" value={this.state.oldPWD} onChange={this.handleInputChange} onBlur={this.handleBlur('oldPWD')}/>
                                    <Input style={{width: "30%", display:"inline-block", marginLeft:"8px"}} type="text" id="newPWD" name="newPWD" placeholder="New password" value={this.state.newPWD} onChange={this.handleInputChange} onBlur={this.handleBlur('newPWD')}/>
                                    <FormFeedback>{errors.pwd}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={3}>
                                <FormGroup>
                                    <Button type="submit" value="submit" style={{background:"rgba(98,98,98,0.5)", width:"100%", fontFamily:"Arial Black", border:"none"}}>
                                        Confirm
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>

                    <hr className="inner-seperation" /> */}

                    <Form onSubmit={this.handleUnsubscription}>
                        <Row style={{marginTop: "15px", marginLeft: "10px", marginRight: "10px"}}>
                            <Col xs={12} md={9}>
                                <FormGroup>
                                    <Label style={{width: "30%", display:"inline-block"}} htmlFor="unsubscription">Auto renew unsubscription</Label>
                                    <Select 
                                        isMulti
                                        name="unsubscription"
                                        value={unsubscription}
                                        options={options}
                                        className="multi-select"
                                        onChange={this.handleMultiChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={3}>
                                <FormGroup>
                                    <Button type="submit" value="submit" style={{background:"rgba(98,98,98,0.5)", width:"100%", fontFamily:"Arial Black", border:"none"}}>
                                        Confirm
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <br />
                <br />
            </div>
        );
    }
}

export default Settings;