import React, { Component } from 'react';
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
        return (
            <ContentWrapper>
                <div>
                    <Row>
                        <Col lg="3">
                            <div className="card b">
                                <div className="card-header bg-gray-lighter text-bold">Personal Settings</div>
                                <ListGroup>
                                    <ListGroupItem action
                                        className={ this.state.activeTab === 'profile' ? 'active':'' }
                                        onClick={() => { this.toggleTab('profile'); }}>
                                        Profile
                                    </ListGroupItem>
                                    <ListGroupItem action
                                        className={ this.state.activeTab === 'account' ? 'active':'' }
                                        onClick={() => { this.toggleTab('account'); }}>
                                        Account
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col lg="9">
                            <TabContent activeTab={this.state.activeTab} className="p-0 b0">
                                <TabPane tabId="profile">
                                    <div className="card b">
                                        <div className="card-header bg-gray-lighter text-bold">Profile</div>
                                        <div className="card-body">
                                            <form action="">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input className="form-control" type="text"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Bio</label>
                                                    <textarea className="form-control" rows="3"></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input className="form-control" type="text"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Company</label>
                                                    <input className="form-control" type="text"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Location</label>
                                                    <input className="form-control" type="text"/>
                                                </div>
                                                <button className="btn btn-info" type="button">Update settings</button>
                                            </form>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="account">
                                    <div className="card b">
                                        <div className="card-header bg-gray-lighter text-bold">Account</div>
                                        <div className="card-body">
                                            <form action="">
                                                <div className="form-group">
                                                    <label>Current password</label>
                                                    <input className="form-control" type="password"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>New password</label>
                                                    <input className="form-control" type="password"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Confirm new password</label>
                                                    <input className="form-control" type="password"/>
                                                </div>
                                                <button className="btn btn-info" type="button">Update password</button>
                                                <p>
                                                    <small className="text-muted">* Integer fermentum accumsan metus, id sagittis ipsum molestie vitae</small>
                                                </p>
                                            </form>
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

export default Settings;


