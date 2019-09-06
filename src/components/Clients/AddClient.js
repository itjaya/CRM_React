import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Card, CardBody, Modal,ModalHeader,ModalBody,ModalFooter, Button} from 'reactstrap';
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux';
import ReactWizard from 'react-bootstrap-wizard';
import ClientStep1 from './ClientStep1';
import ClientStep2 from './ClientStep2';
import * as clientActions from '../../store/actions/client';

class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg: "",
            condition : false,
            redirectCondition : false
        }
    }
    finishButtonClick = (allStates) => {
        let data = {
            ordId: this.props.orgData.orgResult._id,
            clientStep1: allStates.Business_Information.clientStep1,
            clientStep2: allStates.Contact_Details.clientStep2
        }
        this.props.addClient(data)
        this.setState({ modal : true})

    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.addClients.msg !== undefined) {
            this.setState({ msg: nextProps.addClients.msg,condition: nextProps.addClients.condition })
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleOk = () =>{   
        if(this.state.condition){
            this.setState({ redirectCondition : true})
        }
        this.setState({ modal : false})
    }
    render() {
        if (this.state.redirectCondition) {
            return <Redirect to="/manageClients" />
        }
        var steps = [
            // this step hasn't got a isValidated() function, so it will be considered to be true
            { stepName: "Business_Information", component: ClientStep1 },
            // this step will be validated to false
            { stepName: "Contact_Details", component: ClientStep2 },
        ];

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Client
                        {/* <small>Form validation based on Controlled Components.</small> */}
                        </div>
                    </div>
                    <Card className="card-default" >
                        <CardBody>
                            <ReactWizard
                                navSteps
                                steps={steps}
                                description=""
                                headerTextCenter
                                validate={true}
                                color="primary"
                                finishButtonClick={this.finishButtonClick}
                                wizardData = {this.props.location.state}
                            />
                        </CardBody>
                    </Card>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>ADD CLIENT</ModalHeader>
                        <ModalBody>
                            {this.state.msg}                       
                            </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleOk.bind(this)}>Ok</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </ContentWrapper>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        addClients: state.clientReducer.addResult,
        orgData: state.organization
        // loading : state.user.userLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addClient: (event) => dispatch(clientActions.addClient(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);