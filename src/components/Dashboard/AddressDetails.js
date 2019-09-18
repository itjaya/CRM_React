import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Card, CardBody, Modal,
    ModalHeader,
    ModalBody,
    Button, Col, Input
} from 'reactstrap';
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';


class AddressDetails extends Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    validateOnChange = () => {

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
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th >Organization</th>
                                    <th className="sort-alpha">Email Id</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="gradeX" >
                                    <td>dfsdf</td>
                                    <td>sdsdf</td>
                                    <td>dfsdf</td>
                                    <td>dfsdf</td>
                                    <td>sdfsdfsdf</td>
                                    <td>dsfsdf</td>
                                    <td><Link to={{ pathname: "/viewUser" }}>View</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}><strong>ADD USER</strong></ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.onSubmit} name="userForm" ref="userForm" >
                                {/* <legend className="mb-4">Personal Details</legend> */}
                                <div className="row py-4 justify-content-center">
                                    <div className="col-12 col-sm-10">
                                        <form className="form-horizontal">
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Street 1</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="street1" name="street1" type="text" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Street 2</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="street2" type="text" name = "street2" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Country</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="country" type="text" name="country" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2"> State</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="state" type="text" name="state"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">City</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="city" name="city" type="text" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Zipcode</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="zipcode" name="zipcode" type="text" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Start Date</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                <Datetime
                                                        inputProps={{
                                                            name: 'addrStartDtae',
                                                            className: 'form-control required',
                                                            // placeholder: 'Enter project start date'
                                                        }}
                                                        onChange={this.validateOnChange.bind(this, "start")}
                                                        timeFormat={false}
                                                        />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">End Date</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                <Datetime
                                                        inputProps={{
                                                            name: 'addrEndDate',
                                                            className: 'form-control required',
                                                            // placeholder: 'Enter project start date'
                                                        }}
                                                        onChange={this.validateOnChange.bind(this, "end")}
                                                        timeFormat={false}
                                                        />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Currently Active</label>
                                                <div className="col-xl-10 col-md-9 col-8">
                                                    <input className="form-control" id="active" name="active" type="checkbox" placeholder="" />
                                                </div>
                                            </div>
                                        </form> 
                                    </div>
                                </div>
                                <div style={{ float: "right" }}>
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

export default AddressDetails;