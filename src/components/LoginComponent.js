import React, {Component} from 'react';
import {Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            touched:{
                username: false,
                password: false
            }
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleLoginChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin(event){
        event.preventDefault();
        let databody = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch(config.serverUrl+'/users/login', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            this.props.onUsernameChange(this.state.username, data.token);
            if(data.success === false) alert(data.status);
            else if(data.respondent) this.props.history.push('/home');
            else
                this.props.history.push('/homeSponsor');
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({touched: { ...this.state.touched, [field]: true}});
    }

    validate(username, password){

        const errors = {
            username: '',
            password: ''
        };

        if(this.state.touched.username && username.length < 1)
            errors.username = 'Username should be >= 1 characters';
        if (this.state.touched.password && password.length < 6)
            errors.password = 'Password should be >= 6 characters';

        return errors;
    }

    render(){
        const errors = this.validate(this.state.username, this.state.password);
        return(
            <div className="container">
                <div className="col-12 col-md-6 offset-md-3">
                    <h5 style={{marginTop:"230px", fontFamily:"Arial Black"}}>Login</h5>
                    <hr className="seperation" />
                </div>
                <Form onSubmit={this.handleLogin} style={{marginBottom:"230px"}}> 
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" value={this.state.username} valid={errors.username === ''} invalid={errors.username !== ''} onChange={this.handleLoginChange} onBlur={this.handleBlur('username')}/>
                                <FormFeedback>{errors.username}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{size: 6, offset:3}}>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" value={this.state.password} valid={errors.password === ''} invalid={errors.password !== ''} onChange={this.handleLoginChange} onBlur={this.handleBlur('password')}/>
                                <FormFeedback>{errors.password}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={{size: 2, offset:3}}>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary" style={{width: "100%"}}>Login</Button>
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={{size: 5}}>
                            <Link style={{position:"absolute", bottom:"10px", textDecoration:"underline"}} to={{pathname: `/users/signup`}}>Create a new account</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Login;