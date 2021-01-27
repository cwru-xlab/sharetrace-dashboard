import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';

class HeaderSponsor extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.handeLogout = this.handeLogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handeLogout(event){
        event.preventDefault();
        this.props.onUsernameChange(this.state.username, '');
        this.props.history.push('/users/login');
    }

    render(){
        return(
            <div>
                <Navbar dark bg-primary expand="lg">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand>
                            <p style={{fontFamily:"Fantasy", color: "white"}}>ShareTarce</p>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button className="button-mr" outline onClick={this.handeLogout}>
                                        <span className="fa fa-sign-out fa-lg"></span> Logout
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default HeaderSponsor;