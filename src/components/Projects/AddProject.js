import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Select from 'react-select';
import { Row, Col, Input, Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import $ from 'jquery';
import moment from 'moment';
import swal from 'sweetalert';

import ContentWrapper from '../Layout/ContentWrapper';
import * as userActions from '../../store/actions/userActions';
import * as clientActions from '../../store/actions/client';
import * as vendorActions from '../../store/actions/vendor';
import * as projectActions from '../../store/actions/projectActions';

import 'react-datetime/css/react-datetime.css';
import 'jquery-validation/dist/jquery.validate.js';
import 'react-toastify/dist/ReactToastify.css';


class AddProject extends Component {

    state = {
        users: [],
        clients: [],
        vendors: [],
        selectedOption: '',
        selectedClientOption: '',
        selectedVendorOption: '',
        userError: false,
        clientError: false,
        vendorError: false,
        redirect : false,
        projectForm: {
            projectName: '',
            projectStartDate: new Date(),
            projectEndDate: new Date(),
            street1: '',
            street2: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
        }
    }

    validateOnChange = (event, data) => {

        if (moment.isMoment(data)) {
            let element = document.getElementsByName("projectForm")
            let form = element[0]
            if (event === "start") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["projectStartDate"]: moment(data).toDate(),
                    }
                });
            }
            else if (event === "end") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["projectEndDate"]: moment(data).toDate(),
                    }
                });            
            }
        }
        else {
            const input = event.target;
            const form = input.form
            const value = input.type === 'checkbox' ? input.checked : input.value;

            this.setState({
                [form.name]: {
                    ...this.state[form.name],
                    [input.name]: value,
                }
            });
        }
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption: selectedOption, userError: false });
    }

    handleClientSelect = (selectedClientOption) => {
        this.setState({ selectedClientOption: selectedClientOption, clientError: false });
    }

    handleVendorSelect = (selectedVendorOption) => {
        this.setState({ selectedVendorOption: selectedVendorOption, vendorError: false });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let obj = {};

        const form = $(this.refs.projectForm)
        if (form.valid()) {
            if (Object.keys(this.state.selectedOption).length === 0) {
                this.setState({ userError: true })
            }
            if (Object.keys(this.state.selectedClientOption).length === 0) {
                this.setState({ clientError: true })
            }
            if (Object.keys(this.state.selectedVendorOption).length === 0) {
                this.setState({ vendorError: true })
            }
            if (Object.keys(this.state.selectedOption).length > 0 && Object.keys(this.state.selectedClientOption).length > 0 && Object.keys(this.state.selectedVendorOption).length > 0) {

                if(this.props.location.state) {
                    obj = {
                        projectId : this.props.location.state._id,
                        data: this.state.projectForm,
                        clientDetails: this.state.selectedClientOption,
                        vendorDetails: this.state.selectedVendorOption,
                        user : this.state.selectedOption,
                        organization : this.props.orgData._id 
                    }
                }
                else {
                    obj = {
                        data: this.state.projectForm,
                        clientDetails: this.state.selectedClientOption,
                        vendorDetails: this.state.selectedVendorOption,
                        user : this.state.selectedOption,
                        organization : this.props.orgData._id 
                    }
                }
                this.props.onAddProject(obj)
            }
        }
        else {
            if (Object.keys(this.state.selectedOption).length === 0) {
                this.setState({ userError: true })
            }
            if (Object.keys(this.state.selectedClientOption).length === 0) {
                this.setState({ clientError: true })
            }
            if (Object.keys(this.state.selectedVendorOption).length === 0) {
                this.setState({ vendorError: true })
            }
        }
    }

    componentDidMount() {
        let orgId = this.props.orgData._id
        this.props.getUsers(orgId);
        this.props.getClient(orgId);
        this.props.getVendor(orgId);
        // console.log("props", this.props)
        if(this.props.location.state !== undefined) {
            let projectData = this.props.location.state
            this.setState({
                projectForm: {
                    projectName: projectData.projectName,
                    projectStartDate: projectData.startDate,
                    projectEndDate: projectData.endDate,
                    street1: projectData.street1,
                    street2: projectData.street2,
                    country: projectData.country,
                    state: projectData.state,
                    city: projectData.city,
                    zipcode: projectData.zipcode,
                },
                selectedOption: projectData.userId,
                selectedClientOption: projectData.clientId,
                selectedVendorOption: projectData.vendorId
            })
        }
    }

    componentDidUpdate = (prevProps) => {
       
        if (prevProps.users !== this.props.users) {
            let array = [];
            this.props.users.map((user) => {
                return (
                    user.role.value !== "admin" ?
                        array.push({
                            label: user.firstName,
                            value: user._id
                        }) : []
                )
            })
            this.setState({ users: array })
        }
        if (prevProps.clients !== this.props.clients) {
            let array = [];
            this.props.clients.map(client => {
                array.push({
                    label: client.clientName,
                    value: client._id
                })
            })
            this.setState({ clients: array })
        }
        if (prevProps.vendors !== this.props.vendors) {
            let array = [];
            this.props.vendors.map(vendor => {
                array.push({
                    label: vendor.vendorName,
                    value: vendor._id
                })
            })
            this.setState({ vendors: array })
        }
        if (prevProps.projects !== this.props.projects) {
            swal({
                text: this.props.projects.msg,
                icon: "success",
                button: "Ok",
            })
                .then((value) => {
                    this.setState({ redirect: true })
                });
        }

    }

    render() {

        if(this.state.redirect) {

            return <Redirect to = {{ pathname : "/manageProjects"}}/>
        }
        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Project
                        </div>
                    </div>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Add Project</li>
                    </ol>
                    <Card className="card-default">
                        <CardBody>
                            <Row>
                                <div className="col-md-12">
                                    <form onSubmit={this.onSubmit} name="projectForm" ref="projectForm">
                                        {/* <legend className="mb-4">Type validation</legend> */}
                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">Project Name</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="projectName"
                                                        placeholder="Enter project name"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.projectName}
                                                        className="required"
                                                    />
                                                </Col>
                                                <label className="col-md-1 col-form-label">Select a user</label>
                                                <Col md={5}>
                                                    <Select
                                                        name="projectUser"
                                                        placeholder="Select user"
                                                        value={this.state.selectedOption}
                                                        onChange={this.handleChangeSelect}
                                                        options={this.state.users}
                                                    />
                                                    {this.state.userError ? <label style={{ color: "#f05050" }}>This field is required</label> : ""}
                                                </Col>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">Client</label>
                                                <Col md={5}>
                                                    <Select
                                                        name="clientName"
                                                        placeholder="Select client"
                                                        value={this.state.selectedClientOption}
                                                        onChange={this.handleClientSelect}
                                                        options={this.state.clients}
                                                    />
                                                    {this.state.clientError ? <label style={{ color: "#f05050" }}>This field is required</label> : ""}
                                                </Col>
                                                <label className="col-md-1 col-form-label">Vendor</label>
                                                <Col md={5}>
                                                    <Select
                                                        name="vendorName"
                                                        placeholder="Select vendor"
                                                        value={this.state.selectedVendorOption}
                                                        onChange={this.handleVendorSelect}
                                                        options={this.state.vendors}
                                                    />
                                                    {this.state.vendorError ? <label style={{ color: "#f05050" }}>This field is required</label> : ""}

                                                </Col>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">Start Date</label>
                                                <Col md={5}>
                                                    <Datetime
                                                        inputProps={{
                                                            name: 'projectStartDtae',
                                                            className: 'form-control required',
                                                            placeholder: 'Enter project start date'
                                                        }}
                                                        timeFormat = {false}
                                                        onChange={this.validateOnChange.bind(this, "start")}
                                                        value = {moment(this.state.projectForm.projectStartDate).toDate()}
                                                    />
                                                </Col>
                                                <label className="col-md-1 col-form-label">End Date</label>
                                                <Col md={5}>
                                                    <Datetime
                                                        inputProps={{
                                                            name: 'projectEndDate',
                                                            className: 'form-control required',
                                                            placeholder: 'Enter project end date'
                                                        }}
                                                        timeFormat = {false}
                                                        onChange={this.validateOnChange.bind(this, "end")}
                                                        value = {moment(this.state.projectForm.projectEndDate).toDate()}

                                                    />
                                                </Col>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">Street1</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="street1"
                                                        placeholder="Enter street address"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.street1}
                                                        className="required"
                                                    />
                                                </Col>
                                                <label className="col-md-1 col-form-label">Street2</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="street2"
                                                        placeholder="Enter street address"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.street2}
                                                        className="required" />
                                                </Col>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">Country</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="country"
                                                        placeholder="Enter country"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.country}
                                                        className="required" />
                                                </Col>
                                                <label className="col-md-1 col-form-label">State</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="state"
                                                        placeholder="Enter state"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.state}
                                                        className="required" />
                                                </Col>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-1 col-form-label">City</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="city"
                                                        placeholder="Enter city"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.city}
                                                        className="required" />
                                                </Col>
                                                <label className="col-md-1 col-form-label">Zipcode</label>
                                                <Col md={5}>
                                                    <Input type="text"
                                                        name="zipcode"
                                                        placeholder="Enter zipcode"
                                                        onChange={this.validateOnChange}
                                                        value={this.state.projectForm.zipcode}
                                                        className="required" />
                                                </Col>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div style={{ float: "right" }}>
                                                <Button color="success" type="submit" >Save</Button>{' '}
                                                <Button color="danger" type = "button">Cancel</Button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.allUsers,
        orgData: state.organization.orgResult,
        clients: state.clientReducer.clientData,
        vendors: state.vendorReducer.vendorData,
        projects: state.projects.addProjectResult
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (event) => dispatch(userActions.getUsers(event)),
        getClient: (event) => dispatch(clientActions.getClient(event)),
        getVendor: (event) => dispatch(vendorActions.getVendor(event)),
        onAddProject: (event) => dispatch(projectActions.addProject(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);