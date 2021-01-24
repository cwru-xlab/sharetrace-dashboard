import React, { Component } from 'react';
import Header from './HeaderComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

const UsernameContext = React.createContext('');

class Main extends Component{

    constructor(props){
        super(props);
        this.state = { username: '', token: ''};
    }

    onUsernameChange = (username, token) => {
        this.setState({ 
            username: username,
            token: token,
        });
    }

    render(){
        const basic = [
            '/users/login',
            '/users/signup'
        ]
        const respondent = [
            '/'
        ]

        const sponsor = [

        ]
        
        return(
            <div>
                <UsernameContext.Provider value={{state: this.state}}>
                    {basic.indexOf(this.props.location.pathname) >= 0 && <Header history={this.props.history} onUsernameChange={this.onUsernameChange}/>}
                    {respondent.indexOf(this.props.location.pathname) >= 0 && <Header history={this.props.history} onUsernameChange={this.onUsernameChange}/>}
                    <Switch>
                        <Route exact path="/users/login" component={()=><Login history={this.props.history} onUsernameChange={this.onUsernameChange}/>} />
                        <Route exact path="/users/signup" component={()=><Signup history={this.props.history} onUsernameChange={this.onUsernameChange}/>} />
                        <Redirect to="/users/login" />
                    </Switch>
                    <Footer />
                </UsernameContext.Provider>
            </div>
        );
    }
}

export default withRouter(Main);