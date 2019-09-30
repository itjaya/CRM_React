import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import FormValidator from '../Forms/FormValidator';
import 'jquery-validation/dist/jquery.validate.js';
import 'react-datetime/css/react-datetime.css';
import $ from 'jquery';
import * as addressActions from "../../store/actions/address";
import { country } from "../CountryAndStates/country";
import Select from 'react-select'
import indiaStates from "indian-states-cities";

var UsaStates = require('usa-states').UsaStates;
var cities = require('cities');

class AddressDetails extends Component {

    state = {
        modal: false,
        addDetails : [],
        AddressForm: {
            Street_1: "",
            Street_2: "",
            Country: "",
            State: "",
            City: "",
            Zipcode: "",
            Checkbox: "",
            addressStartDate : new Date(),
            addressEndDate : new Date()
        },
        states : [],
        cities : [],
        stateName : "",
        countryName : "",
        cityName : ""
        
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }
   
    validateOnChange = (event, data) => {
        if (moment.isMoment(data)) {
            let element = document.getElementsByName("AddressForm")
            let form = element[0]
            if (event === "start") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["addressStartDate"]: moment(data).toDate(),
                    }
                });
            }
            else if (event === "end") {
                this.setState({
                    [form.name]: {
                        ...this.state[form.name],
                        ["addressEndDate"]: moment(data).toDate(),
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
        const form = $(this.refs.AddressForm)
        if (form.valid()) {
            // console.log("sate", this.state.AddressForm)
            // console.log(this.props.user);
            let data = {
                type: "Address",
                id: this.props.user._id,
                Street_1: this.state.AddressForm.Street_1,
                Country: this.state.countryName,
                State: this.state.stateName,
                City: this.state.cityName,
                Zipcode: this.state.AddressForm.Zipcode,
                addressEndDate: this.state.AddressForm.addressEndDate,
                addressStartDate: this.state.AddressForm.addressStartDate,
                Active : this.state.AddressForm.Checkbox

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
            for (var j = 0; j < array.states.length; j++) {
                stateArray.push({ label: array.states[j].name, value: array.states[j].abbreviation })
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
            for (var l = 0; l < newArray.length; l++) {
                citiesArray.push({ label: newArray[l].city, value: newArray[l].city })
            }
            this.setState({ cities: citiesArray })
        }
        this.setState({ stateName : e.label})

    }
    handleCity = (e) => {
        this.setState({ cityName : e.label})
    }
    componentDidMount () {
        this.props.getUserDetailes(this.props.user._id)
    }
    componentDidUpdate (prevProps) {

        if(prevProps.userDetails !== this.props.userDetails){
            // console.log("ASHOK", this.props.userDetails)
            this.setState({addDetails : this.props.userDetails.addDetails})
        }
     }
    render() {

        return (
            <div>
                <div className="card-body">
                    <Container fluid>
                        <div style={{ float: "right" }}>
                            <Button color="primary" onClick={this.toggleModal}>Add Address</Button>
                        </div>
                        <table className="table table-striped my-4 w-100" id="usersTable">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>street1</th>
                                    <th>country</th>
                                    <th >state</th>
                                    <th className="sort-alpha">city</th>
                                    <th>zipcode</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.addDetails.length >0 ? this.state.addDetails.map((data, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{k + 1}</td>
                                            <td>{data.street1}</td>
                                            <td>{data.country}</td>
                                            <td>{data.state}</td>
                                            <td>{data.city}</td>
                                            <td>{data.zipcode}</td>
                                        </tr>
                                    )
                                })
                                : 
                                <tr>
                                    <td className="text-center" colSpan="6"> No Data</td>
                                </tr>}
                            </tbody>
                        </table>
                    </Container>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}><strong>ADD USER</strong></ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.onSubmit} name="AddressForm" ref="AddressForm" >
                                {/* <legend className="mb-4">Personal Details</legend> */}
                                <div className="row py-4 justify-content-center">
                                    <div className="col-12 col-sm-10">
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Street 1</label>
                                                <Col md={8}>
                                                    <Input type="text"
                                                        name="Street_1"
                                                        invalid={this.hasError('AddressForm', 'Street_1', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter Street 1"
                                                        value={this.state.AddressForm.Street_1}
                                                        className="required"
                                                    />
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Street 2</label>
                                                <Col md={8}>
                                                    <Input type="text"
                                                        name="Street_2"
                                                        invalid={this.hasError('AddressForm', 'Street_2', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter Street 2"
                                                        value={this.state.AddressForm.Street_2}
                                                        className="required"
                                                    />
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Country</label>
                                                <Col md={8}>
                                                <Select options={country}  onChange={this.handleCountry}/>
                                                    {/* <Input type="text"
                                                        name="Country"
                                                        invalid={this.hasError('AddressForm', 'Country', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter Country"
                                                        value={this.state.AddressForm.Country}
                                                        className="required"
                                                    /> */}
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">State</label>
                                                <Col md={8}>
                                                <Select options={this.state.states} onChange={this.handleState}/>

                                                    {/* <Input type="text"
                                                        name="State"
                                                        invalid={this.hasError('AddressForm', 'State', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter State"
                                                        value={this.state.AddressForm.State}
                                                        className="required"
                                                    /> */}
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">City</label>
                                                <Col md={8}>
                                                <Select options={this.state.cities} onChange={this.handleCity}/>
                                                    {/* <Input type="text"
                                                        name="City"
                                                        invalid={this.hasError('AddressForm', 'City', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter City"
                                                        value={this.state.AddressForm.City}
                                                        className="required"
                                                    /> */}
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Zipcode</label>
                                                <Col md={8}>
                                                    <Input type="number"
                                                        name="Zipcode"
                                                        invalid={this.hasError('AddressForm', 'Zipcode', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        placeholder="Enter Zipcode"
                                                        value={this.state.AddressForm.Zipcode}
                                                        className="required"
                                                    />
                                                </Col>
                                            </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Start Date</label>
                                                <Col md={8}>
                                                    <Datetime
                                                        inputProps={{
                                                            name: 'addrStartDtae',
                                                            className: 'form-control required',
                                                            // placeholder: 'Enter project start date'
                                                        }}
                                                        onChange={this.validateOnChange.bind(this, "start")}                                                        
                                                        timeFormat={false}
                                                        value = {moment(this.state.AddressForm.addressStartDate).toDate()}
                                                    />
                                                    </Col>
                                                </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">End Date</label>
                                                <Col md={8}>
                                                    <Datetime
                                                        inputProps={{
                                                            name: 'addrEndDate',
                                                            className: 'form-control required',
                                                            // placeholder: 'Enter project start date'
                                                        }}
                                                        onChange={this.validateOnChange.bind(this, "end")}                                                        
                                                        timeFormat={false}
                                                        value = {moment(this.state.AddressForm.addressEndDate).toDate()}
                                                    />
                                                    </Col>
                                                </div>
                                            <div className="form-group row align-items-center">
                                                <label className="col-md-4 col-form-label">Currently Active</label>
                                                <Col md={8}>
                                                    <Input type="checkbox"
                                                        name="Checkbox"
                                                        invalid={this.hasError('AddressForm', 'Checkbox', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        // placeholder="Enter Zipcode"
                                                        value={this.state.AddressForm.Checkbox}
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
    // console.log(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
