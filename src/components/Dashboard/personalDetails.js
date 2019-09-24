import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import FormValidator from '../Forms/FormValidator';
import 'jquery-validation/dist/jquery.validate.js';
import $ from 'jquery';
import * as addressActions from "../../store/actions/address";
import Datetime from 'react-datetime';
import moment from "moment";
import { country } from "../CountryAndStates/country";

import Select from 'react-select'
import indiaStates from "indian-states-cities";
var UsaStates = require('usa-states').UsaStates;
var cities = require('cities');

const Gender = [
    { value: 'Male', label: 'Male' },
    { value: 'FeMale', label: 'FeMale' }
]
class PersonalDetails extends Component {

    state = {
        modal: false,
        perDetails : [],
        PersonalForm : {
            JobTitle : "",
            Email : "",
            PhoneNo : "",
            SSN : "",
            VisaType : "",
            MaritalStatus : "",
            PayrollId  : '',
            doj : new Date(),
            dob : new Date(),
        },
        states : [],
        cities : [],
        stateName : "",
        countryName : "",
        cityName : "",
       
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }
    validateOnChange = (event, data) => {
        if (moment.isMoment(data)) {
            let element = document.getElementsByName("PersonalForm")
            let form = element[0]
            if (event === "dob") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["dob"]: moment(data).toDate(),
                    }
                });
            }
            else if (event === "doj") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["doj"]: moment(data).toDate(),
                    }
                });            
            }
        }
        else{
            const input = event.target;
            const form = input.form
            const value = input.type === 'checkbox' ? input.checked : input.value;
    
            const result = FormValidator.validate(input);
    
            this.setState({
                [form.name]: {
                    ...this.state[form.name],
                    [input.name]: value,
                    errors: {
                        ...this.state[form.name].errors,
                        [input.name]: result
                    }
                }
            });
        
        }   
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    onSubmit = e => {
        e.preventDefault()
        const form = $(this.refs.PersonalForm)
        if (form.valid()) {
            // console.log("ASHOK", this.state.PersonalForm)
            let data = {
                type: "Personal",
                id: this.props.user._id,
                JobTitle : this.state.PersonalForm.JobTitle,
                Email : this.state.PersonalForm.Email,
                doj : this.state.PersonalForm.doj,
                dob : this.state.PersonalForm.dob,
                VisaType : this.state.PersonalForm.VisaType,
                SSN : this.state.PersonalForm.SSN,
                PhoneNo: this.state.PersonalForm.PhoneNo,
                PayrollId: this.state.PersonalForm.PayrollId,
                MaritalStatus: this.state.PersonalForm.MaritalStatus,
                country : this.state.countryName,
                State : this.state.stateName,
                Gender : this.state.Gender

            }
            // console.log("data", data)
            this.props.addAddress(data);
            this.setState({ modal : !this.state.modal})        
        }
    } 
    handleCountry = (e) => {

        let stateArray = [];
        if (e.value === "India") {
            let array = indiaStates.allStates();

            for (var i = 0; i < array.length; i++) {
                stateArray.push({ label: array[i], value: array[i] })
            }
            this.setState({ states: stateArray })
        }
        else {
            var usStates = new UsaStates();
            let array = usStates
            for (var i = 0; i < array.states.length; i++) {
                stateArray.push({ label: array.states[i].name, value: array.states[i].abbreviation })
            }
            this.setState({ states: stateArray })
        }
        this.setState({ countryName: e.value })
    }

    handleState = (e) => {

        let citiesArray = [];
        if (this.state.countryName === "India") {
            let newArray = indiaStates.allCities(this.state.state);
            for (var k = 0; k < newArray.length; k++) {
                citiesArray.push({ label: newArray[k], value: newArray[k] })
            }
            this.setState({ cities: citiesArray })
        }
        else {
            let newArray = cities.findByState(e.value);
            for (var k = 0; k < newArray.length; k++) {
                citiesArray.push({ label: newArray[k].city, value: newArray[k].city })
            }
            this.setState({ cities: citiesArray })
        }
        this.setState({ stateName : e.label})

    }
    hangleGender = (e) => {
        this.setState({ Gender : e.value })
    }
    componentDidMount () {
        this.props.getUserDetailes(this.props.user._id)
    }
    componentDidUpdate (prevProps) {
        if(prevProps.userDetails !== this.props.userDetails){
            // console.log("ASHOK", this.props.userDetails)
            this.setState({perDetails : this.props.userDetails.perDetails})
        }
     }
    render() {
        return (
            <div>
                <div className="card-body">
                    <Container fluid>
                        <div style={{ float: "right" }}>
                            <Button color="primary" onClick={this.toggleModal}>Add Personal Details</Button>
                        </div>
                        <table className="table table-striped my-4 w-100" id="usersTable">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>jobTitle</th>
                                    <th>country</th>
                                    <th >State</th>
                                    <th className="sort-alpha">phoneNo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.perDetails.length >0 ? this.state.perDetails.map((data, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{k + 1}</td>
                                            <td>{data.jobTitle}</td>
                                            <td>{data.country}</td>
                                            <td>{data.state}</td>
                                            <td>{data.phoneNo}</td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td className="text-center" colspan="5"> No Data</td>
                                </tr>}
                            </tbody>
                        </table>
                    </Container>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}><strong>Add Personal Details</strong></ModalHeader>
                        <ModalBody>
                        <form onSubmit={this.onSubmit} name="PersonalForm" ref="PersonalForm" >
                                {/* <legend className="mb-4">Personal Details</legend> */}
                                <div className="row py-4 justify-content-center">
                                    <div className="col-12 col-sm-10">
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Job Title</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="JobTitle"
                                                    invalid={this.hasError('PersonalForm', 'JobTitle', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Job Title"
                                                    value={this.state.PersonalForm.JobTitle}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Alternate Email</label>
                                            <Col md={8}>
                                                <Input type="email"
                                                    name="Email"
                                                    invalid={this.hasError('PersonalForm', 'Email', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Email"
                                                    value={this.state.PersonalForm.Email}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Date of Joining</label>
                                            <Col md={8}>
                                                <Datetime
                                                    inputProps={{
                                                        name: 'doj',
                                                        className: 'form-control required',
                                                        // placeholder: 'Enter project start date'
                                                    }}
                                                    onChange={this.validateOnChange.bind(this, "doj")}
                                                    timeFormat={false}
                                                    value={this.state.PersonalForm.doj}
                                                    />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Gender</label>
                                            <Col md={8}>
                                            <Select options={Gender}  onChange={this.hangleGender}/>
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Phone No</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="PhoneNo"
                                                    invalid={this.hasError('PersonalForm', 'PhoneNo', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Phone No"
                                                    value={this.state.PersonalForm.PhoneNo}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">SSN</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="SSN"
                                                    invalid={this.hasError('PersonalForm', 'SSN', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter SSN"
                                                    value={this.state.PersonalForm.SSN}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Date of Birth</label>
                                                <Col md={8}>
                                                <Datetime
                                                    inputProps={{
                                                        name: 'dob',
                                                        className: 'form-control required',
                                                        // placeholder: 'Enter project start date'
                                                    }}
                                                    onChange={this.validateOnChange.bind(this, "dob")}
                                                    timeFormat={false}
                                                value={this.state.PersonalForm.dob}
                                                />                                                
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Visa Type</label>
                                                <Col md={8}>
                                                <Input type="text"
                                                    name="VisaType"
                                                    invalid={this.hasError('PersonalForm', 'VisaType', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Visa Type"
                                                    value={this.state.PersonalForm.VisaType}
                                                    className="required"
                                                />
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Country</label>
                                                <Col md={8}>
                                                <Select options={country}  onChange={this.handleCountry}/>
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">State</label>
                                                <Col md={8}>
                                                <Select options={this.state.states} onChange={this.handleState}/>
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Marital Status</label>
                                                <Col md={8}>
                                                <Input type="text"
                                                    name="MaritalStatus"
                                                    invalid={this.hasError('PersonalForm', 'MaritalStatus', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Marital Status"
                                                    value={this.state.PersonalForm.MaritalStatus}
                                                    className="required"
                                                />
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Payroll Id</label>
                                                <Col md={8}>
                                                <Input type="text"
                                                    name="PayrollId"
                                                    invalid={this.hasError('PersonalForm', 'PayrollId', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Payroll Id"
                                                    value={this.state.PersonalForm.PayrollId}
                                                    className="required"
                                                />
                                                </Col>
                                            </div>
                                    </div>
                                </div>
                                 <div className="float-right">
                                    <Button color="success" type="submit" >Save</Button>{' '}
                                    <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                                </div>
                            </form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    // console.log(state.addressReducer.userDetails)
    return {
        user: state.user.userLogin.userData,
        userDetails : state.addressReducer.userDetails
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addAddress: (event) => dispatch(addressActions.addAddress(event)),
        getUserDetailes : (event) => dispatch(addressActions.getUserDetailes(event))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
