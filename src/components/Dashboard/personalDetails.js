import React, { Component } from 'react';
import { connect } from 'react-redux';
import {    Button, Col, Input
} from 'reactstrap';
import swal from 'sweetalert';
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
    { value: 'Female', label: 'Female' }
]
class PersonalDetails extends Component {

    state = {
        perDetails: [],
        PersonalForm: {
            jobTitle: "",
            alternateEmailId: "",
            phoneNo: "",
            SSN: "",
            visaType: "",
            maritalStatus: "",
            payrollId: '',
            dateOfBirth: new Date(),
            dateOfJoining: new Date(),
        },
        states: [],
        cities: [],
        stateName: "",
        countryName: "",
        cityName: "",
        country: {},
        state: {},
        gender: {}

    }


    validateOnChange = (event, data) => {
        if (moment.isMoment(data)) {
            let element = document.getElementsByName("PersonalForm")
            let form = element[0]
            if (event === "dateOfBirth") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["dateOfBirth"]: moment(data).toDate(),
                    }
                });
            }
            else if (event === "dateOfJoining") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["dateOfJoining"]: moment(data).toDate(),
                    }
                });
            }
        }
        else {
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
                JobTitle: this.state.PersonalForm.jobTitle,
                Email: this.state.PersonalForm.alternateEmailId,
                doj: this.state.PersonalForm.dateOfJoining,
                dob: this.state.PersonalForm.dateOfBirth,
                VisaType: this.state.PersonalForm.visaType,
                SSN: this.state.PersonalForm.SSN,
                PhoneNo: this.state.PersonalForm.phoneNo,
                PayrollId: this.state.PersonalForm.payrollId,
                MaritalStatus: this.state.PersonalForm.maritalStatus,
                country: this.state.country.label,
                State: this.state.state.label,
                Gender: this.state.gender.label

            }
            // console.log("data", data)
            this.props.addAddress(data);
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
            for (var j = 0; j < array.states.length; j++) {
                stateArray.push({ label: array.states[j].name, value: array.states[j].abbreviation })
            }
            this.setState({ states: stateArray })
        }
        this.setState({ country: e })
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
            for (var l = 0; l < newArray.length; l++) {
                citiesArray.push({ label: newArray[l].city, value: newArray[l].city })
            }
            this.setState({ cities: citiesArray })
        }
        this.setState({ state: e })

    }
    hangleGender = (e) => {
        this.setState({ gender: e })
    }
    componentDidMount() {
       this.refreshData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.userDetails !== this.props.userDetails) {
            let data = this.props.userDetails.perDetails[0];
            if (data !== undefined) {
                let countryArray = [], stateArray = [], genderArray = []
                countryArray.push({ label: data.country, value: data.country });
                stateArray.push({ label: data.state, value: data.state })
                genderArray.push({ label: data.gender, value: data.gender })
                this.setState({ PersonalForm: data, country: countryArray, state: stateArray, gender: genderArray })
            }
        }
        if (prevProps.perData !== this.props.perData) {
            swal({
                text: this.props.perData.msg,
                icon: "success",
                // buttons: true,
            })
                .then((data) => {
                    if (data) {
                        this.refreshData()
                    }
                })
        }
    }
    refreshData = () => {
        setTimeout(() => {
            if(this.props.userData) {
                this.props.getUserDetailes(this.props.userData._id)
            }
            else {
                this.props.getUserDetailes(this.props.user._id)
            }
        }, 1000 / 4);
    }
    render() {
        return (
            <div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit} name="PersonalForm" ref="PersonalForm" >
                        {/* <legend className="mb-4">Personal Details</legend> */}
                        <div className="row py-4 justify-content-center">
                            <div className="col-12 col-sm-10">
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Job Title</label>
                                    <Col md={8}>
                                        <Input type="text"
                                            name="jobTitle"
                                            invalid={this.hasError('PersonalForm', 'jobTitle', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Job Title"
                                            value={this.state.PersonalForm.jobTitle}
                                            className="required"
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Alternate Email</label>
                                    <Col md={8}>
                                        <Input type="email"
                                            name="alternateEmailId"
                                            invalid={this.hasError('PersonalForm', 'alternateEmailId', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Email"
                                            value={this.state.PersonalForm.alternateEmailId}

                                            className="required"
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Date of Joining</label>
                                    <Col md={8}>
                                        <Datetime
                                            inputProps={{
                                                name: 'dateOfJoining',
                                                className: 'form-control required',
                                                // placeholder: 'Enter project start date'
                                            }}
                                            onChange={this.validateOnChange.bind(this, "dateOfJoining")}
                                            timeFormat={false}
                                            value={this.state.PersonalForm.dateOfJoining}
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Gender</label>
                                    <Col md={8}>
                                        <Select options={Gender} onChange={this.hangleGender} value={this.state.gender} />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Phone No</label>
                                    <Col md={8}>
                                        <Input type="text"
                                            name="phoneNo"
                                            invalid={this.hasError('PersonalForm', 'phoneNo', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Phone No"
                                            value={this.state.PersonalForm.phoneNo}
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
                                                name: 'dateOfBirth',
                                                className: 'form-control required',
                                                // placeholder: 'Enter project start date'
                                            }}
                                            onChange={this.validateOnChange.bind(this, "dateOfBirth")}
                                            timeFormat={false}
                                            value={this.state.PersonalForm.dateOfBirth}
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Visa Type</label>
                                    <Col md={8}>
                                        <Input type="text"
                                            name="visaType"
                                            invalid={this.hasError('PersonalForm', 'visaType', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Visa Type"
                                            value={this.state.PersonalForm.visaType}
                                            className="required"
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Country</label>
                                    <Col md={8}>
                                        <Select options={country} onChange={this.handleCountry} value={this.state.country} />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">State</label>
                                    <Col md={8}>
                                        <Select options={this.state.states} onChange={this.handleState} value={this.state.state} />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Marital Status</label>
                                    <Col md={8}>
                                        <Input type="text"
                                            name="maritalStatus"
                                            invalid={this.hasError('PersonalForm', 'maritalStatus', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Marital Status"
                                            value={this.state.PersonalForm.maritalStatus}
                                            className="required"
                                        />
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-4 col-form-label">Payroll Id</label>
                                    <Col md={8}>
                                        <Input type="text"
                                            name="payrollId"
                                            invalid={this.hasError('PersonalForm', 'payrollId', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            placeholder="Enter Payroll Id"
                                            value={this.state.PersonalForm.payrollId}
                                            className="required"
                                        />
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <div className="float-right">
                            <Button color="success" type="submit" >Save</Button>{' '}
                        </div>
                    </form>
                    <br /><br />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.userLogin.userData,
        userDetails: state.addressReducer.userDetails,
        perData: state.addressReducer.addResult
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addAddress: (event) => dispatch(addressActions.addAddress(event)),
        getUserDetailes: (event) => dispatch(addressActions.getUserDetailes(event))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
