import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Card, CardBody, Modal,ModalHeader,ModalBody, Button} from 'reactstrap';
import { connect } from 'react-redux';
import ReactWizard from 'react-bootstrap-wizard';
import { Redirect } from "react-router-dom"
import VendorStep1 from './VendorStep1';
import VendorStep2 from './VendorStep2';
import * as vendorActions from '../../store/actions/vendor';

class AddVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg: "",
            condition : false
        }
    }
    finishButtonClick = (allStates) => {
        this.props.addVendor(allStates);
    }
    componentWillReceiveProps = (nextProps) => {
          if(nextProps.addVendors.msg !== undefined){
        this.setState({ msg: nextProps.addVendors.msg, modal: true})
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
            { stepName: "Business_Information", component: VendorStep1 },
            // this step will be validated to false
            { stepName: "Contact_Details", component: VendorStep2 },
        ];

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Vendor
                        <small>Form validation based on Controlled Components.</small>
                        </div>
                    </div>
                    <Card className="card-default">
                        <CardBody>
                            <ReactWizard
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
        addVendors: state.vendorReducer.addResult,
        // loading : state.user.userLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addVendor: (event) => dispatch(vendorActions.addVendor(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVendor);
