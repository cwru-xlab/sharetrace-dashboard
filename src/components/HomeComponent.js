import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
var config = require('../config');


class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            sponsors: [],
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        fetch(config.serverUrl+'/home/'+this.props.username, {
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
                    sponsors: data.user.sponsors 
                })
            }
            else
                alert(JSON.stringify(data.err));
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){

        const sponsors = this.state.sponsors.map((sponsor) =>{

            const activities = sponsor.activities.map((activity) => {
                return(
                    <tr>
                        <td>{activity.activity_name}</td>
                        <td><Link to={{pathname: `/activity`, state:{activity_name: activity.activity_name, link: activity.link}}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Link></td>
                    </tr>
                );
            })

            return (
                <div className="col-12 col-md-3 offset-md-1">
                    <Card>
                        <CardHeader className="bg-primary text-white"><b>Our Team</b></CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-12"><center>Survey-{sponsor.name}</center></dt>
                                <dt className="col-12"><center>
                                    <Button outline onClick={this.toggleModal}>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </Button>
                                </center></dt>
                            </dl>
                        </CardBody>
                    </Card>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Surveys to be done</ModalHeader>
                        <ModalBody>
                            <table id="activities">
                                <tbody>
                                    {activities}
                                </tbody>
                            </table>
                        </ModalBody>
                    </Modal>
                </div>
            );
        });

        return(
            <div className="container" style={{minHeight: "725px"}}>
                <div className="col-12">
                    <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Surveys to be done</h5>
                    <hr className="seperation" />
                    <div className="row">
                        {sponsors}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;