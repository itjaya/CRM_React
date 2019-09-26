import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, TabContent, TabPane, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Card } from 'reactstrap';
import $ from 'jquery';
import Datetime from 'react-datetime';
import moment from 'moment'
import {Link} from 'react-router-dom';

import AddressDetails from '../Dashboard/AddressDetails';
import EducationDetails from '../Dashboard/EducationDetails';
import PersonalDetails from '../Dashboard/personalDetails';
import AdminTimesheet from '../Timesheets/AdminTimesheet';

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

    handleClick = () => {
        $('#myfile').click()
    }
    validateOnChange = () => {
    }
    render() {
        let userData = {};
        let userRole = this.props.user.role.label
        if (this.props.location.state) {
            userData = this.props.location.state
        }
        else {
            userData = this.props.user
        }

        return (
            <ContentWrapper>
                <div className="content-heading">{userData.firstName}&nbsp;{userData.lastName}</div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        {userRole === "superAdmin" ?
                            <Link to="/dashboard">Dashboard</Link> : userRole ==="Admin" ? <Link to="/admindashboard">Dashboard</Link> : ""}
                        </li>
                    <li className="breadcrumb-item"><Link to="/manageUsers">Users</Link></li>
                    <li className="breadcrumb-item active">User</li>
                </ol>
                {/* <Row> */}
                <Card>
                    <form className="ie-fix-flex">
                        <div role="tabpanel">
                            <Nav tabs justified>
                                
                                <NavItem className="cursor">   
                                    <NavLink
                                        className={this.state.activeTab === 'profile' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('profile'); }}>
                                        Profile
                                            </NavLink>
                                            
                                </NavItem>
                                <NavItem className="cursor">
                                    <NavLink
                                        className={this.state.activeTab === 'personal' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('personal'); }}>
                                        Personal Details
                                            </NavLink>
                                </NavItem>
                                <NavItem className="cursor">
                                    <NavLink
                                        className={this.state.activeTab === 'address' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('address'); }}>
                                        Address Details
                                            </NavLink>
                                </NavItem>
                                <NavItem className="cursor">
                                    <NavLink
                                        className={this.state.activeTab === 'education' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('education'); }}>
                                        Education Details
                                            </NavLink>
                                </NavItem>

                                <NavItem className="cursor">
                                    <NavLink
                                        className={this.state.activeTab === 'timesheets' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('timesheets'); }}>
                                        Timesheets
                                                </NavLink>
                                </NavItem> 
                            </Nav>
                        </div>
                    </form>
                    <TabContent activeTab={this.state.activeTab} className="p-0 b0">

                        <TabPane tabId="profile">
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
                        </TabPane>
                        
                        <TabPane tabId="personal">
                            <PersonalDetails userData = {userData}/>
                        </TabPane>
                        
                        <TabPane tabId="address">
                            <AddressDetails />
                        </TabPane>

                        <TabPane tabId="education">
                            <EducationDetails />
                        </TabPane>
                        
                        <TabPane tabId="timesheets">
                            <AdminTimesheet user = {userData}/>
                        </TabPane>

                    </TabContent>
                    {/* </Row> */}
                </Card>
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


