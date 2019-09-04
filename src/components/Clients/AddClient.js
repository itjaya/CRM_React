import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Card, CardBody, Modal,ModalHeader,ModalBody, Button} from 'reactstrap';
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
            condition : false
        }
    }
    finishButtonClick = (allStates) => {
        console.log(allStates);
        this.props.addClient(allStates)
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.addClients.msg !== undefined) {
            this.setState({ msg: nextProps.addClients.msg, modal: true })
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {

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
                            />
                        </CardBody>
                    </Card>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}><strong>ADD VENDOR</strong></ModalHeader>
                        <ModalBody>
                            {this.state.msg}
                            <div style={{ float: "right" }}>
                                <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                            </div>
                        </ModalBody>
                    </Modal>
                </ContentWrapper>
            </div>
        )
    }
}
const mapStateToProps = state => {
    // console.log("haiiii", state)
    return {
        addClients: state.clientReducer.addResult,
        // loading : state.user.userLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addClient: (event) => dispatch(clientActions.addClient(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);