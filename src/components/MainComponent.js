import React, { Component } from 'react';
import Header from './HeaderComponent';
import HeaderRespondent from './HeaderRespondentComponent';
import HeaderSponsor from './HeaderSponsorComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Home from './HomeComponent';
import Activity from './ActivityComponent';
import Debit from './DebitComponent';
import Settings from './SettingsComponent';
import HomeSponsor from './HomeSponsorComponent';
import AllUser from './AllUsersComponent';
import RespondentsList from './RespondentsListComponent';
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
            '/home',
            '/:sponsor/:activity',
            '/debit',
            '/settings'
        ]

        const sponsor = [
            '/homeSponsor',
            '/usersList',
            '/respondentsList'
        ]
        
        return(
            <div>
                <UsernameContext.Provider value={{state: this.state}}>
                    {basic.indexOf(this.props.location.pathname) >= 0 && <Header history={this.props.history} onUsernameChange={this.onUsernameChange}/>}
                    {respondent.indexOf(this.props.location.pathname) >= 0 && <HeaderRespondent history={this.props.history} onUsernameChange={this.onUsernameChange}/>}
                    {sponsor.indexOf(this.props.location.pathname) >= 0 && <HeaderSponsor history={this.props.history} onUsernameChange={this.onUsernameChange}/>}
                    <Switch>
                        <Route exact path="/users/login" component={()=><Login history={this.props.history} onUsernameChange={this.onUsernameChange}/>} />
                        <Route exact path="/users/signup" component={()=><Signup history={this.props.history} />} />
                        <Route exact path="/home" component={()=><Home history={this.props.history} username={this.state.username} token={this.state.token}/>} />
                        <Route exact path="/:sponsor/:activity" component={()=><Activity path={this.props.location.pathname} token={this.state.token}/>} />
                        <Route exact path="/debit" component={()=><Debit history={this.props.history} username={this.state.username} token={this.state.token}/>} />
                        <Route exact path="/settings" component={() => <Settings history={this.props.history} username={this.state.username} token={this.state.token} />} />
                        <Route exact path="/homeSponsor" component={() => <HomeSponsor username={this.state.username} token={this.state.token} />} />
                        <Route exact path="/usersList" component={() => <AllUser history={this.props.history} username={this.state.username} token={this.state.token} />} />
                        <Route exact path="/respondentsList" component={() => <RespondentsList history={this.props.history} username={this.state.username} token={this.state.token} />} />
                        <Redirect to="/users/login" />
                    </Switch>
                    <Footer />
                </UsernameContext.Provider>
            </div>
        );
    }
}

export default withRouter(Main);