import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
// Filestyle
import 'bootstrap-filestyle';

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

    render() {
        let userData = this.props.user;
        console.log("userrda", userData)
        return (
            <ContentWrapper>
                <div>
                    <Row>
                        <Col lg="3">
                            <div className="card card-default">
                                <div className="card-body text-center">
                                    <div className="py-4">
                                        <img className="img-fluid rounded-circle img-thumbnail thumb96" src="img/user/02.jpg" alt="Contact" />
                                    </div>
                                    <h3 className="m-0 text-bold">{userData.firstName}&nbsp;{userData.lastName}</h3>
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
                                                className={this.state.activeTab === 'contact' ? 'active' : ''}
                                                onClick={() => { this.toggleTab('contact'); }}>
                                                Contact Details
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
                                                                <input className="form-control" id="inputContact1" type="text" placeholder="" defaultValue={userData.lastName} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2">Email</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact2" type="email" defaultValue={userData.email} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Company</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact8" type="text" placeholder="No Company" defaultValue = {userData.organization[0].label} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Role</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact8" type="text" placeholder="No Company" defaultValue = {userData.role.label} disabled />
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
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">First Name</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact1" type="text" placeholder="" defaultValue={userData.firstName} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact1">Last Name</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact1" type="text" placeholder="" defaultValue={userData.lastName} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact2">Email</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact2" type="email" defaultValue={userData.email} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Company</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact8" type="text" placeholder="No Company" defaultValue = {userData.organization[0].label} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="text-bold col-xl-2 col-md-3 col-4 col-form-label text-right" htmlFor="inputContact8">Role</label>
                                                            <div className="col-xl-10 col-md-9 col-8">
                                                                <input className="form-control" id="inputContact8" type="text" placeholder="No Company" defaultValue = {userData.role.label} disabled />
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


