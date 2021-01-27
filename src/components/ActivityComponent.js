import React, {Component} from 'react';

class Activity extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: this.props.location.state.activity_name,
            link: this.props.location.state.link
        };
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