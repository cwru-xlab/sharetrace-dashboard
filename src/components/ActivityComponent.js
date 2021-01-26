import React, {Component} from 'react';
import config from '../config';

class Activity extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            link: "",
            expiration: ""
        };
    }

    componentDidMount(){
        fetch(config.serverUrl+this.props.path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                name: data.activity_name,
                link: data.link,
                expiration: data.expiration_date
            })
        })
    }

    render() {
        return(
            <div className="container">
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Survey-{this.state.name}</h5>
                    <hr className="seperation" />
                    <iframe style={{width:"100%"}} src={this.state.link}></iframe>
                </div>
            </div>
        );
    }
}

export default Activity;