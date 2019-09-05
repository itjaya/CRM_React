import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { connect } from 'react-redux';
import ReactWizard from 'react-bootstrap-wizard';
import {Card, CardBody, Modal,ModalHeader,ModalBody,ModalFooter, Button} from 'reactstrap';
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
            condition : false,
            redirectCondition : false,
            totalData : {},
        }
    }
    finishButtonClick = (allStates) => {
        let data = {
            ordId : this.props.orgData.orgResult._id,
            data : allStates
        }
        this.props.addVendor(data);
    }
    componentWillReceiveProps = (nextProps) => {
          if(nextProps.addVendors.msg !== undefined){
        this.setState({ msg: nextProps.addVendors.msg, modal: true,condition: nextProps.addVendors.condition})
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
    // async componentDidMount () {
    //    let stateData = await this.props.location.state
    //    this.setState({ totalData : stateData })
    // }


    render() {
        if (this.state.redirectCondition) {
            return <Redirect to="/manageVendor" />
        }
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
                                wizardData = {this.props.location.state}
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
                        <ModalHeader toggle={this.toggleModal}><h4 style={{ "color": "orange" }}>ADD CLIENT</h4></ModalHeader>
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
    // console.log("haiiii", state)
    return {
        addVendors: state.vendorReducer.addResult,
        orgData: state.organization
        }
}

const mapDispatchToProps = dispatch => {
    return {
        addVendor: (event) => dispatch(vendorActions.addVendor(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVendor);
