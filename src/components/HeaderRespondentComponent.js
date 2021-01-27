import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class HeaderRespondent extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handeLogout = this.handeLogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
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
                            <Nav navbar>
                                <NavItem >
                                    <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/debit"><span className="fa fa-refresh fa-lg"></span> Data Debit</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/settings"><span className="fa fa-cog fa-lg"></span> Settings</NavLink>
                                </NavItem>
                            </Nav>
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

export default HeaderRespondent;