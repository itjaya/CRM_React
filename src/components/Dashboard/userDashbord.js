import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import $ from 'jquery';
import Datetime from 'react-datetime';
import moment from 'moment';

import AddressDetails from './AddressDetails';
import EducationDetails from './EducationDetails';
// Filestyle
import 'bootstrap-filestyle';
import 'react-datetime/css/react-datetime.css';


class Settings extends Component {

    state = {
        activeTab: 'profile'
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleClick = () =>{
        $('#myfile').click()
    }
    validateOnChange = () => {
    }
    render() {
        let userData = {};
        let userRole = this.props.user.role.label
        if(this.props.location.state) {
            userData = this.props.location.state
        }
        else {
            userData = this.props.user
        }
        return (
            <ContentWrapper>
                <div>
                    <Row>
                        <Col lg="3">
                            <div className="card card-default">
                                <div className="card-body text-center">
                                    <div className="py-4">
                                        <img className="img-fluid img-thumbnail thumb96" src="img/upload-icon.png" alt="Contact" onClick = {this.handleClick}/>
                                        <input type="file" id="myfile" style={{ display: "none" }} />
                                    </div>
                                    <h3 className="m-0 text-bold">{userData.firstName}&nbsp;{userData.lastName}</h3>
                                    <div className="my-3">
                                        <p>Hello, this is my presentation text. Have fun!</p>
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
                                                className={this.state.activeTab === 'personal' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('personal'); }}>
                                                Personal Details
                                            </ListGroupItem>
                                            <ListGroupItem action
                                                className={this.state.activeTab === 'address' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('address'); }}>
                                                Address Details
                                            </ListGroupItem>
                            
                                            <ListGroupItem action
                                                className={this.state.activeTab === 'education' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('education'); }}>
                                                Education Details
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
                                                    <form className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">First Name</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact1" type="text" placeholder="" defaultValue={userData.firstName} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Last Name</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact2" type="text" placeholder="" defaultValue={userData.lastName} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2">Email</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact3" type="email" defaultValue={userData.email} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Company</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact4" type="text" placeholder="" defaultValue={userData.organization[0].label} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Role</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact5" type="text" placeholder="" defaultValue={userData.role.label} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row text-right">
                                                            <div className="col-md-12">
                                                                <button className="btn btn-info" type="submit">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="personal">
                                    <div className="card card-default">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex justify-content-center col">
                                                <div className="h4 m-0 text-center">Personal Details</div>
                                            </div>
                                        </div>
                                        {/* <div className="card-header bg-gray-lighter text-bold">Profile</div> */}
                                        <div className="card-body">
                                            <div className="row py-4 justify-content-center">
                                                <div className="col-12 col-sm-10">
                                                    <form className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Job Title</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="jobTitle" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Alternate Email</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="alternateEmail" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2">Date of Joining</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                            <Datetime
                                                                    inputProps={{
                                                                        name: 'dateOfJoining',
                                                                        className: 'form-control required',
                                                                        // placeholder: 'Enter project start date'
                                                                    }}
                                                                    onChange={this.validateOnChange.bind(this, "doj")}
                                                                    timeFormat={false}
                                                                    // value={moment().toDate()}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Gender</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="gender" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Phone No</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="phoneNo" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">SSN</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="SSN" type="text" placeholder="" />
                                                            </div>
                                                        </div>  <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Date of Birth</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <Datetime
                                                                    inputProps={{
                                                                        name: 'dateOfBirth',
                                                                        className: 'form-control required',
                                                                        // placeholder: 'Enter project start date'
                                                                    }}
                                                                    timeFormat={false}
                                                                    onChange={this.validateOnChange.bind(this, "dob")}
                                                                    // value={moment().toDate()}
                                                                />
                                                            </div>
                                                        </div>  <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Visa Type</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="visaType" type="text" placeholder="" />
                                                            </div>
                                                        </div>  <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Country</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="country" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">State</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="state" type="text" placeholder="" />
                                                            </div>
                                                        </div>  <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Marital Status</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="maritalStatus" type="text" placeholder="" />
                                                            </div>
                                                        </div>  <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Payroll Id</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="payrollId" type="text" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row text-right">
                                                            <div className="col-md-12">
                                                                <button className="btn btn-info" type="submit">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="address">
                                    <div className="card card-default">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex justify-content-center col">
                                                <div className="h4 m-0 text-center">Address Details</div>
                                            </div>
                                        </div>
                                        <AddressDetails />
                                    </div>
                                </TabPane>
                                <TabPane tabId="education">
                                    <div className="card card-default">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex justify-content-center col">
                                                <div className="h4 m-0 text-center">Education Details</div>
                                            </div>
                                        </div>
                                        <EducationDetails />
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
                                                    <form className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Old Password</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="oldPwd" type="password" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">New Password</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="newPwd" type="password" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2">Confirm Password</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="pwd" type="password" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row text-right">
                                                            <div className="col-md-12">
                                                                <button className="btn btn-info" type="submit">Update</button>
                                                            </div>
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
    return {
        user: state.user.userLogin.userData
    }
}

export default connect(mapStateToProps, null)(Settings);


