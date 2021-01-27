import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col,FormFeedback} from 'reactstrap';
var config = require('../config');

class Debit extends Component{

    constructor(props){
        super(props);

        this.state = {
            sponsors: [
                {
                  name: "A",
                  description: "AAA",
                  time_remaining: "30 days"  
                },
                {
                    name: "B",
                    description: "BBB",
                    time_remaining: "30 days"  
                  }
            ],
            checked:[true, false]
            // sponsors: [],
            // checked: []
        }
    }

    componentDidMount(){
        fetch(config.serverUrl+'/debit/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                this.setState({
                    sponsors: data.sponsors,
                    checked: new Array(data.sponsors.length).fill().map(() => false)
                })
            }
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleSubmit(event){
        let databody = {
            "sponsors": this.state.sponsors,
            "checked": this.state.checked
        }
        fetch(config.serverUrl+'/debit/'+this.props.username, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/home');
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleChange(event, index){
        this.state.checked[index] = event.target.checked;
        this.setState({checked: this.state.checked});
    }

    render(){
        const debits = this.state.sponsors.map((debit, index) => {
            return(
                    <tr>
                        <td>{debit.name}</td>
                        <td>{debit.time_remaining}</td>
                        <td>{debit.description}</td>
                        <td>
                            <label>
                                <input name="renew" type="checkbox" checked={this.state.checked[index]} onChange={(e) => this.handleChange(e, index)} />
                            </label>
                        </td>
                    </tr>
            );
        })

        return(
            <div className="container" style={{minHeight: "725px"}}>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Establish/Edit Your Data Debit</h5>
                    <hr className="seperation" />
                    <br />
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <table id="debit">
                            <tr>
                                <th>Sponsor</th>
                                <th>Time Remaining</th>
                                <th>Description</th>
                                <th>Renew</th>
                            </tr>
                            {debits}
                        </table>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                        <Col xs={{size:5, offset: 6}} md={{size: 2, offset:9}}>
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

export default Debit;
 