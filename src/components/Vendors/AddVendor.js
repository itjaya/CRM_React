import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { connect } from 'react-redux';
import ReactWizard from 'react-bootstrap-wizard';
import { Link } from "react-router-dom"
import {Card, CardBody} from 'reactstrap';
import { Redirect } from "react-router-dom"
import VendorStep1 from './VendorStep1';
import VendorStep2 from './VendorStep2';
import * as vendorActions from '../../store/actions/vendor';
import swal from 'sweetalert';

class AddVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectCondition : false,
        }
    }
    finishButtonClick = (allStates) => {
        let data = {
            ordId : this.props.orgData.orgResult._id,
            data : allStates
        }
        this.props.addVendor(data);
    }
    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        if (prevProps.addVendors !== this.props.addVendors) {
            swal({
                text: this.props.addVendors.msg,
                icon: "success",
                button: "Ok",
            })
                .then((value) => {
                    this.setState({ redirectCondition: true })
                });
        }
    }
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
                        {/* <small>Form validation based on Controlled Components.</small> */}
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Add Vendor</li>
                  </ol>
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
