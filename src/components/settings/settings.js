import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, TabContent, TabPane, ListGroup, ListGroupItem, Input, Button } from 'reactstrap';
import $ from 'jquery';
import FormValidator from '../Forms/FormValidator';
import 'jquery-validation/dist/jquery.validate.js';
// Filestyle
import 'bootstrap-filestyle';
import 'react-datetime/css/react-datetime.css';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

import * as userActions from "../../store/actions/userActions"

class Settings extends Component {

    state = {
        activeTab: 'profile',
        userForm: {
            oldPassword: "",
            password: '',
            password2: '',
        },
        profileForm: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            role: ""
        },
        passwordMsg: "",
        orgName: "",
        divStyle: { visibility: "visible" }
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleClick = () => {
        $('#myfile').click()
    }
    onSubmit1 = e => {
        e.preventDefault()
        const form = $(this.refs.profileForm)
        if (form.valid()) {
            let data = {
                id : this.props.user._id,
                firstName : this.state.profileForm.firstName,
                lastName : this.state.profileForm.lastName,
                email : this.state.profileForm.email
            }
            // console.log("data", data)
            this.props.userRegister(data)
        }
    }
    onSubmit = e => {
        e.preventDefault()
        const form = $(this.refs.userForm)
        if (form.valid()) {
            let data = {
                type: "Account",
                id: this.props.user._id,
                oldPassword: this.state.userForm.oldPassword,
                password: this.state.userForm.password
            }
            this.props.userPasswordUpdate(data)
        }
    }
    validateOnChange = event => {
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
    componentDidUpdate(prevProps) {
        if (prevProps.userPassword !== this.props.userPassword) {
            if (this.props.userPassword.condition) {
                swal({
                    text: this.props.userPassword.msg,
                    icon: "success",
                    // buttons: true,
                })
                    .then((password) => {
                        if (password) {
                            this.setState({ activeTab: 'profile' })
                        }
                    })
            }
            else {
                this.setState({ passwordMsg: this.props.userPassword.msg })
            }
        }
        if(prevProps.userResult !== this.props.userResult){
            swal({
                text: this.props.userResult.msg,
                icon: "success",
                // buttons: true,
            })
                .then((user) => {
                    if (user) {
                        this.setState({ activeTab: 'profile' })
                    }
                })
        }
    }
    componentDidMount() {
        if (this.props.user.role.label === "superAdmin") {
            this.setState({ divStyle: { display: "none" },profileForm: this.props.user, orgName: "" })

        }
        else{
            this.setState({ profileForm: this.props.user, orgName: this.props.user.organization[0].label })
        }
    }
    render() {
        // let profileForm = this.props.user;
        let userRole = this.props.user.role.label;

        return (
            <ContentWrapper>
                <div class="content-heading"><div>Settings</div></div>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        {userRole === "superAdmin" ?
                            <Link to="/dashboard">Dashboard</Link> : userRole === "Admin" ? <Link to="/admindashboard">Dashboard</Link> : ""}
                    </li>
                    <li class="breadcrumb-item active">Users</li>
                </ol>
                <div>
                    <Row>
                        <Col lg="3">
                            <div className="card card-default">
                                <div className="card-body text-center">
                                    <div className="py-4">
                                        <img className="img-fluid img-thumbnail thumb96" src="img/upload-icon.png" alt="Contact" onClick={this.handleClick} />
                                        <input type="file" id="myfile" style={{ display: "none" }} />
                                    </div>
                                    <h3 className="m-0 text-bold">{this.state.profileForm.firstName}&nbsp;{this.state.profileForm.lastName}</h3>
                                    <div className="my-3">
                                        <p>Hello, Ithis is my presentation text. Have fun!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-default d-none d-lg-block">
                                <div className="card-header">
                                    <div className="card-title text-center">Personal Settings</div>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <ListGroup>
                                            <ListGroupItem action
                                                className={this.state.activeTab === 'profile' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('profile'); }}>
                                                Profile
                                            </ListGroupItem>
                                            <ListGroupItem action
                                                className={this.state.activeTab === 'account' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('account'); }}>
                                                Account
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col lg="9">
                            <TabContent activeTab={this.state.activeTab} className="p-0 b0">
                                <TabPane tabId="profile">
                                    <div className="card card-default">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex justify-content-center col">
                                                <div className="h4 m-0 text-center">Profile Information</div>
                                            </div>
                                        </div>
                                        {/* <div className="card-header bg-gray-lighter text-bold">Profile</div> */}
                                        <div className="card-body">

                                            <div className="row py-4 justify-content-center">
                                                <div className="col-12 col-sm-10">
                                                    <form onSubmit={this.onSubmit1} name="profileForm" ref="profileForm" >
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">First Name</label>
                                                            <Col md={8}>
                                                                <Input type="text"
                                                                    name="firstName"
                                                                    invalid={this.hasError('profileForm', 'firstName', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter Firstname"
                                                                    value={this.state.profileForm.firstName}
                                                                    className="required"
                                                                />
                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Last Name</label>
                                                            <Col md={8}>
                                                                <Input type="text"
                                                                    name="lastName"
                                                                    invalid={this.hasError('profileForm', 'lastName', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter Lastname"
                                                                    value={this.state.profileForm.lastName}
                                                                    className="required"
                                                                />
                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Email</label>
                                                            <Col md={8}>
                                                                <Input type="email"
                                                                    name="email"
                                                                    invalid={this.hasError('profileForm', 'email', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter email"
                                                                    value={this.state.profileForm.email}
                                                                    className="required"
                                                                />
                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center" style={this.state.divStyle}>
                                                            <label className="col-md-4 col-form-label">Company</label>
                                                            <Col md={8}>
                                                                <Input type="text"
                                                                    name="company"
                                                                    invalid={this.hasError('profileForm', 'company', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter company"
                                                                    value={this.state.orgName}
                                                                    className="required"
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Role</label>
                                                            <Col md={8}>
                                                                <Input type="text"
                                                                    name="role"
                                                                    invalid={this.hasError('profileForm', 'role', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter role"
                                                                    value={this.state.profileForm.role.label}
                                                                    className="required"
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </div>
                                                        <div style={{ float: "right" }}>
                                                            <Button color="success" type="submit" >Save</Button>{' '}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="account">
                                    <div className="card card-default">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex justify-content-center col">
                                                <div className="h4 m-0 text-center">Account Details</div>
                                            </div>
                                        </div>
                                        {/* <div className="card-header bg-gray-lighter text-bold">Profile</div> */}
                                        <div className="card-body">
                                            <div className="row py-4 justify-content-center">
                                                <div className="col-12 col-sm-10">
                                                    <form onSubmit={this.onSubmit} name="userForm" ref="userForm" >
                                                        <p className="text-center text-danger">{this.state.passwordMsg}</p>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Old Password</label>
                                                            <Col md={8}>
                                                                <Input type="password"
                                                                    name="oldPassword"
                                                                    invalid={this.hasError('userForm', 'oldPassword')}
                                                                    onChange={this.validateOnChange}
                                                                    placeholder="Old Password"
                                                                    data-param="id-password"
                                                                    className="required"
                                                                    value={this.state.userForm.oldPassword}

                                                                />
                                                                <span className="invalid-feedback">Field must be equal to previous</span>
                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Password</label>
                                                            <Col md={8}>
                                                                <Input type="password"
                                                                    id="id-password"
                                                                    name="password"
                                                                    invalid={this.hasError('userForm', 'password', 'required')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["required"]'
                                                                    placeholder="Enter Password"
                                                                    className="required"
                                                                    value={this.state.userForm.password}

                                                                />
                                                                <span className="invalid-feedback">Field is required</span>

                                                            </Col>
                                                        </div>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-4 col-form-label">Confirm Password</label>
                                                            <Col md={8}>
                                                                <Input type="password"
                                                                    name="password2"
                                                                    invalid={this.hasError('userForm', 'password2', 'equalto')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["equalto"]'
                                                                    placeholder="Confirm Password"
                                                                    data-param="id-password"
                                                                    className="required"
                                                                    value={this.state.userForm.password2}

                                                                />
                                                                <span className="invalid-feedback">Field must be equal to previous</span>
                                                            </Col>
                                                        </div>
                                                        <div style={{ float: "right" }}>
                                                            <Button color="success" type="submit" >Save</Button>{' '}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>

                        </Col>
                    </Row>
                </div>
            </ContentWrapper>
        );
    }

}

const mapStateToProps = state => {
    // console.log(state)
    return {
        user: state.user.userLogin.userData,
        userPassword: state.user.userPassword,
        userResult: state.user.userRegister
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userRegister: (event) => dispatch(userActions.userRegister(event)),
        userPasswordUpdate: (event) => dispatch(userActions.userUpdatePassword(event)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


