import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import FormValidator from '../Forms/FormValidator';
import 'jquery-validation/dist/jquery.validate.js';
import $ from 'jquery';
import * as addressActions from "../../store/actions/address";
import { country } from "../CountryAndStates/country";
import Select from 'react-select'
import indiaStates from "indian-states-cities";
var UsaStates = require('usa-states').UsaStates;
var cities = require('cities');

class EducationDetails extends Component {

    state = {
        modal: false,
        eduDetails : [],
        EducationForm : {
            Degree : "",
            University : "",
            YearOfEnd : "",
            YearOfJoin : "",
            Courses : "",
            GPA : ""
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

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    onSubmit = e => {
        e.preventDefault()
        const form = $(this.refs.EducationForm)
        if (form.valid()) {
            let data = {
                type: "Education",
                id: this.props.user._id,
                Degree : this.state.EducationForm.Degree,
                University : this.state.EducationForm.University,
                YearOfEnd : this.state.EducationForm.YearOfEnd,
                YearOfJoin : this.state.EducationForm.YearOfJoin,
                Courses : this.state.EducationForm.Courses,
                GPA : this.state.EducationForm.GPA,
                Country: this.state.countryName,
                State: this.state.stateName,
                City: this.state.cityName,

            }
            // // console.log("data", data)
            this.props.addAddress(data);
            this.props.getUserDetailes(this.props.user._id)
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
            for (var k = 0; k < array.states.length; k++) {
                stateArray.push({ label: array.states[k].name, value: array.states[k].abbreviation })
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
            for (var i = 0; i < newArray.length; i++) {
                citiesArray.push({ label: newArray[i].city, value: newArray[i].city })
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
            this.setState({eduDetails : this.props.userDetails.eduDetails})
        }
     }
    render() {
        return (
            <div>
                <div className="card-body">
                    <Container fluid>

                        <div style={{ float: "right" }}>
                            <Button color="primary" onClick={this.toggleModal}>Add Education</Button>
                        </div>
                        <table className="table table-striped my-4 w-100" id="usersTable">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>school</th>
                                    <th>degree</th>
                                    <th>country</th>
                                    <th >state</th>
                                    <th className="sort-alpha">year of Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.eduDetails.length >0 ?this.state.eduDetails.map((data, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{k + 1}</td>
                                            <td>{data.school}</td>
                                            <td>{data.degree}</td>
                                            <td>{data.country}</td>
                                            <td>{data.state}</td>
                                            <td>{data.yearCompleted}</td>
                                        </tr>
                                    )
                                })
                                : 
                                <tr>
                                    <td className="text-center" colSpan="6"> No Data</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </Container>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}><strong>ADD Education</strong></ModalHeader>
                        <ModalBody>
                        <form onSubmit={this.onSubmit} name="EducationForm" ref="EducationForm" >
                                {/* <legend className="mb-4">Personal Details</legend> */}
                                <div className="row py-4 justify-content-center">
                                    <div className="col-12 col-sm-10">
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Degree</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="Degree"
                                                    invalid={this.hasError('EducationForm', 'Degree', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Degree"
                                                    value={this.state.EducationForm.Degree}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Name of the University</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="University"
                                                    invalid={this.hasError('EducationForm', 'University', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter University Name"
                                                    value={this.state.EducationForm.University}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Courses</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="Courses"
                                                    invalid={this.hasError('EducationForm', 'Courses', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Courses"
                                                    value={this.state.EducationForm.Courses}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Year of Joining</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="YearOfJoin"
                                                    invalid={this.hasError('EducationForm', 'YearOfJoin', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Year of Joining"
                                                    value={this.state.EducationForm.YearOfJoin}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">Year of Completion</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="YearOfEnd"
                                                    invalid={this.hasError('EducationForm', 'YearOfEnd', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Year of Completion"
                                                    value={this.state.EducationForm.YearOfEnd}
                                                    className="required"
                                                />
                                            </Col>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-md-4 col-form-label">GPA</label>
                                            <Col md={8}>
                                                <Input type="text"
                                                    name="GPA"
                                                    invalid={this.hasError('EducationForm', 'GPA', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    placeholder="Enter Year of Completion"
                                                    value={this.state.EducationForm.GPA}
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
                                                <label className="col-md-4 col-form-label">City</label>
                                                <Col md={8}>
                                                <Select options={this.state.cities} onChange={this.handleCity}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails);
