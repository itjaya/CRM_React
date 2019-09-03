import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container, Card, CardBody, Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import ContentWrapper from '../Layout/ContentWrapper';
import DataTable from '../Tables/Datatable';
import FormValidator from '../Forms/FormValidator';
import * as userActions from '../../store/actions/userActions';
import $ from 'jquery';

class ManageConsultant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            userForm: {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
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
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });
        if(!hasError) {
            console.log("state", this.state.userForm)
            this.props.userRegister(this.state.userForm)
            this.setState({ modal : !this.state.modal })
            this.refreshData();
        }
        // console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')
    }

    refreshData = () => {
        this.props.getUsers();
    }

    componentDidMount () {
        this.refreshData();
    }

    componentDidUpdate () {
        if(this.props.allUsers && this.props.allUsers.length > 0) {
            $().ready(() => {
                $("#usersTable").DataTable();
            })
        }
    }
    render() {
       
        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Users
                        </div>
                    </div>
                    <Card className="card-default" >
                        <CardBody>
                            <Container fluid>
                            <div style={{ float: "right" }}>
                                            <Button color="primary" onClick={this.toggleModal}>Add User</Button>
                                        </div><br /><br /><br />
                                        <table className="table table-striped my-4 w-100" id = "usersTable">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th className="sort-alpha">Email Id</th>
                                                    <th>Role</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.allUsers.map((user, i) => {
                                                    return (
                                                        <tr className="gradeX" key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role}</td>
                                                            <td><Link to={{ pathname: "/viewConsultant" }}>View</Link></td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                {/* DATATABLE DEMO 1 */}
                                {/* <Card>
                                    <CardBody>
                                  
                                    </CardBody>
                                </Card> */}
                            </Container>
                        </CardBody>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                            <ModalHeader toggle={this.toggleModal}><strong>ADD USER</strong></ModalHeader>
                            <ModalBody>
                                <form onSubmit={this.onSubmit} name="userForm">
                                    {/* <legend className="mb-4">Personal Details</legend> */}
                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">First Name</label>
                                        <Col md={8}>
                                            <Input type="text"
                                                name="firstName"
                                                invalid={this.hasError('userForm', 'firstName', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                placeholder = "Enter Firstname"
                                                value={this.state.userForm.firstName}
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
                                                placeholder = "Enter Lastname"
                                                value={this.state.userForm.lastName}
                                            />
                                            <span className="invalid-feedback">Field is required</span>
                                        </Col>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <label className="col-md-4 col-form-label">Role</label>
                                        <Col md={8}>
                                            <Input
                                                type="select"
                                                name="role"
                                                invalid={this.hasError('userForm', 'role', 'required')}
                                                onChange={this.validateOnChange}
                                                placeholder="Select user role"
                                                data-validate='["required"]'
                                                value={this.state.userForm.role}
                                            >
                                            <option>Select user role</option>
                                            <option defaultValue="Admin">Admin</option>
                                            <option defaultValue="Manager">Manager</option>
                                            <option defaultValue="Consultant">Consultant</option>
                                            <option defaultValue="Employee">Employee</option>
                                            </Input>
                                            <span className="invalid-feedback">Field is required</span>
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
                                                placeholder = "Enter Email Id"
                                                value={this.state.userForm.email} />
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
                                                placeholder = "Enter Password"
                                                value={this.state.userForm.password} />
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
                                                placeholder = "Confirm Password"
                                                value={this.state.userForm.password2}
                                                data-param="id-password"
                                                />
                                        <span className="invalid-feedback">Field must be equal to previous</span>
                                        </Col>
                                    </div>

                                    <div style = {{ float : "right"}}>
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
        allUsers : state.user.allUsers,
        loading : state.user.userLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userRegister :  (event) => dispatch(userActions.userRegister(event)),
        getUsers : (event) => dispatch(userActions.getUsers(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageConsultant);