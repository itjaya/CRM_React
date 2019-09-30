import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row } from 'reactstrap'
import { connect } from 'react-redux';

import * as orgActions from '../../store/actions/orgActions';
import * as projectActions from '../../store/actions/projectActions';
import * as clientActions from '../../store/actions/client';
import * as vendorActions from '../../store/actions/vendor';
import * as userActions from '../../store/actions/userActions';

class Widgets extends Component {

    state = {
        // default location used for all demos
        location: { lat: 33.7906731, lng: -117.8357194 },
        activeTab: 'tasks'
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

        componentDidMount() {
            this.refreshData();
        }
    
        refreshData = () => {
            let orgId = this.props.orgData.orgResult._id
            this.props.onGetOrganizations(orgId);
            this.props.getProjects(orgId);
            this.props.getClient(orgId);
            this.props.getVendor(orgId);
            this.props.getUsers(orgId);
        }
    

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">Dashboard</div>
                {/* START row */}
                <Row>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-project-diagram fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Projects</h3>
                                <p className="text-muted">{this.props.projects.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-industry fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Vendors</h3>
                                <p className="text-muted">{this.props.vendorsList.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-green" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}>
                                        <span className="sr-only">80% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-user-clock fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Clients</h3>
                                <p className="text-muted">{this.props.clientsList.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                                        <span className="sr-only">40% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-users fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Users</h3>
                                <p className="text-muted">{this.props.allUsers.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                </Row>
                {/* END row */}
               
            </ContentWrapper>
        );
    }

}

const mapStateToProps = state => {
    return {
        orgData: state.organization,
        projects: state.projects.projects,
        clientsList: state.clientReducer.clientData,
        vendorsList: state.vendorReducer.vendorData,
        allUsers: state.user.allUsers,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: (event) => dispatch(orgActions.getOrganization(event)),
        getProjects: (event) => dispatch(projectActions.getProjects(event)),
        getClient: (event) => dispatch(clientActions.getClient(event)),
        getVendor: (event) => dispatch(vendorActions.getVendor(event)),
        getUsers: (event) => dispatch(userActions.getUsers(event)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Widgets);

