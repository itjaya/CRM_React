import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Card, CardBody, Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import $ from 'jquery';
import { connect } from 'react-redux';
import Select from 'react-select'
import swal from 'sweetalert';

import ContentWrapper from '../Layout/ContentWrapper';
import DataTable from '../Tables/Datatable';
import FormValidator from '../Forms/FormValidator';
import 'jquery-validation/dist/jquery.validate.js';


import * as userActions from '../../store/actions/userActions';
import * as orgActions from '../../store/actions/orgActions';


class ManageConsultant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg : "",
            organizations: [],
            users : [],
            style: { display: "none" },
            userRole: "",
            selectedOptionMulti: [],
            colorError: false,
            selectError: false,
            selectedOption: '',
            userForm: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                password2: '',
            }
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
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


    onSubmit = e => {
        e.preventDefault()

        const form = $(this.refs.userForm)
        if(this.state.userRole === "superAdmin") {
            if (form.valid()) {
                if (this.state.selectedOptionMulti.length === 0) {
                    this.setState({ selectError: true })
                }
                if (Object.keys(this.state.selectedOption).length === 0) {
                    this.setState({ colorError: true })
                }
                if (this.state.selectedOptionMulti.length > 0 && Object.keys(this.state.selectedOption).length > 0) {
                    let obj = {
                        data: this.state.userForm,
                        organization: this.state.selectedOptionMulti,
                        role: this.state.selectedOption
                    }
                    this.props.userRegister(obj)
                    setTimeout(() => {
                        this.refreshData();
                    }, 1000);
                }
            }
            else {
                if (this.state.selectedOptionMulti.length === 0) {
                    this.setState({ selectError: true })
                }
                if (Object.keys(this.state.selectedOption).length === 0) {
                    this.setState({ colorError: true })
                }
            }
        }
        else if (this.state.userRole === "admin") {
            if (form.valid()) {
                if (Object.keys(this.state.selectedOption).length === 0) {
                    this.setState({ colorError: true })
                }
                if (Object.keys(this.state.selectedOption).length > 0) {
                    let obj = {
                        data: this.state.userForm,
                        organization: [{ label : this.props.orgData.orgResult.organizationName, value : this.props.orgData.orgResult._id }],
                        role: this.state.selectedOption
                    }
                    this.props.userRegister(obj)
                    setTimeout(() => {
                        this.refreshData();
                    }, 1000);
                }
            }
            else {
                if (Object.keys(this.state.selectedOption).length === 0) {
                    this.setState({ colorError: true })
                }
            }
        }

    }

    refreshData = () => {
        let orgId = this.props.orgData.orgResult._id;
        if (this.state.userRole === "superAdmin") {
            this.props.onGetOrganizations();
            setTimeout(()=>{
                this.props.getUsers();
            },1000/2)
            
        }
        else {
            setTimeout(()=>{
                this.props.getUsers(orgId);
            },1000/2)
        }
    }

    async componentDidMount() {
        let userData = await JSON.parse(sessionStorage.getItem('userData'))
        let userRole = userData.userData.role
        if (userRole.value === "superAdmin") {
            this.setState({ style: { display: "flex" } })
        }
        this.setState({ userRole: userRole.value})
        this.refreshData();
    }

    handleChangeSelectMulti = (selectedOptionMulti) => {
        this.setState({ selectedOptionMulti : selectedOptionMulti, selectError : false });
    }

    handleChangeSelect = (selectedOption) => {        
        this.setState({ selectedOption :  selectedOption,colorError : false });
    }

    componentDidUpdate(prevProps) {
        
        if(prevProps.userResult !== this.props.userResult){
            if(this.props.userResult.condition) {
                this.setState({ modal: !this.state.modal })
            }
            else {
                this.setState({ msg : this.props.userResult.msg})
            }
        }

        if (prevProps.allUsers !== this.props.allUsers) {

            this.setState({ users : this.props.allUsers})
            $().ready(() => {
                $("#usersTable").DataTable();
            })
        }
        if (prevProps.orgData !== this.props.orgData) {
            let orgArray = [];
            this.props.orgData.orgData.map((org) => {
               return orgArray.push({
                    label: org.organizationName,
                    value: org._id
                })
            })
            this.setState({ organizations: orgArray })
        }
    }

    handleActivate = (user) => {    
        let text = "";
        if(user.account) {
            text = "Are you sure do you want deactivate user ?"
        }
        else{
            text = "Are you sure do you want activate user ?"
        }
        swal({
            text: text,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.userActivate(user._id)
                this.refreshData();
            } else {
                swal("Your user data is safe!");
            }
        })   
      
    }
    render() {
        const roles = [
            { label : "Admin", value : "admin"},
            // { label : "Manager", value : "manager"},
            { label : "User", value : "user"},
        ]
        let array = [];

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Users
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Users</li>
                  </ol>
                    <Card className="card-default" >
                        <CardBody>
                            <Container fluid>
                                <div style={{ float: "right" }}>
                                    <Button color="primary" onClick={this.toggleModal}>Add User</Button>
                                </div><br /><br /><br />
                                <table className="table table-striped my-4 w-100" id="usersTable">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th style={this.state.style}>Organization</th>
                                            <th className="sort-alpha">Email Id</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map((user, i) => {
                                            array = [];
                                            if (user.organization.length > 0) {
                                                {
                                                    user.organization.map((org) => {
                                                        return array.push(org.label)
                                                    })
                                                }
                                            }
                                            if (user.role.value !== "superAdmin") {
                                                return (
                                                    <tr className="gradeX" key={i}>
                                                        <td>{i + 1}</td>
                                                        <td><Link to={{ pathname: "/viewUser", state : user }}>{user.firstName}</Link></td>
                                                        <td>{user.lastName}</td>
                                                        <td style={this.state.style}>{array.join(", ")}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role.value}</td>
                                                        <td>{user.account ?
                                                            <i class="far fa-check-circle text-success cursor" style={{ size: "9px" }} onClick={this.handleActivate.bind(this, user)}></i> :
                                                            <i class="far fa-times-circle text-danger cursor" style={{ size: "9px" }} onClick={this.handleActivate.bind(this, user)}></i>}&nbsp;
                                                    </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </Container>
                        </CardBody>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                            <ModalHeader toggle={this.toggleModal}><strong>ADD USER</strong></ModalHeader>
                            <ModalBody>

                                <form onSubmit={this.onSubmit} name="userForm" ref ="userForm" >
                                    <p className="text-center text-danger">{this.state.msg}</p>
                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">First Name</label>
                                        <Col md={8}>
                                            <Input type="text"
                                                name="firstName"
                                                invalid={this.hasError('userForm', 'firstName', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                placeholder="Enter Firstname"
                                                value={this.state.userForm.firstName}
                                                className = "required"
                                            />
                                            <span className="invalid-feedback">Field is required</span>
                                        </Col>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">Last Name</label>
                                        <Col md={8}>
                                            <Input type="text"
                                                name="lastName"
                                                invalid={this.hasError('userForm', 'lastName', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                placeholder="Enter Lastname"
                                                value={this.state.userForm.lastName}
                                                className = "required"

                                            />
                                            <span className="invalid-feedback">Field is required</span>
                                        </Col>
                                    </div>

                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">Role</label>
                                        <Col md={8}>
                                            <Select
                                                name="role"
                                                placeholder = "Select user role"
                                                value={this.state.selectedOption}
                                                onChange={this.handleChangeSelect}
                                                options={roles}
                                            />
                                            {this.state.colorError ? <label style={{color : "#f05050"}}>This field is required</label> : ""}                                      
                                        </Col>
                                    </div>
                                    <div className="form-group row align-items-center" style = {this.state.style}>
                                        <label className="col-md-4 col-form-label">Organization</label>
                                        <Col md={8}>
                                            <Select
                                                name="organization"
                                                placeholder = "Select organization"
                                                isMulti
                                                value={this.state.selectedOptionMulti}
                                                onChange={this.handleChangeSelectMulti}
                                                options={this.state.organizations}
                                            />
                                            {/* <label className=""> {this.state.selectError}</label>     */}
                                            {this.state.selectError ? <label style={{color : "#f05050"}}>This field is required</label> : ""}                                      
                                
                                        </Col>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">Email Id</label>
                                        <Col md={8}>
                                            <Input type="email"
                                                name="email"
                                                invalid={this.hasError('userForm', 'email', 'required') || this.hasError('userForm', 'email', 'email')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required", "email"]'
                                                placeholder="Enter Email Id"
                                                value={this.state.userForm.email} 
                                                className = "required"
                                                />
                                            {this.hasError('userForm', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                                            {this.hasError('userForm', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
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
                                                value={this.state.userForm.password}
                                                className = "required"
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
                                                value={this.state.userForm.password2}
                                                data-param="id-password"
                                                className = "required"
                                            />
                                            <span className="invalid-feedback">Field must be equal to previous</span>
                                        </Col>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <Button color="success" type="submit" >Save</Button>{' '}
                                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </Modal>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        allUsers: state.user.allUsers,
        loading: state.user.userLoading,
        orgData: state.organization,
        userResult: state.user.userRegister
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userRegister: (event) => dispatch(userActions.userRegister(event)),
        getUsers: (event) => dispatch(userActions.getUsers(event)),
        onGetOrganizations: (event) => dispatch(orgActions.getOrganization(event)),
        userActivate: (event) => dispatch(userActions.userActivate(event)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageConsultant);