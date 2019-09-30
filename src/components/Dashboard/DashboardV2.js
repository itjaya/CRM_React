import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';

import * as orgActions from '../../store/actions/orgActions';
import * as projectActions from '../../store/actions/projectActions';
import * as clientActions from '../../store/actions/client';
import * as vendorActions from '../../store/actions/vendor';
import * as userActions from '../../store/actions/userActions';


class DashboardV2 extends Component {

    state = {
        splineData: [{
            "label": "Hours",
            "color": "#23b7e5",
            "data": [
                ["Jan", 70],
                ["Feb", 20],
                ["Mar", 70],
                ["Apr", 85],
                ["May", 59],
                ["Jun", 93],
                ["Jul", 66],
                ["Aug", 86],
                ["Sep", 60],
                ["Oct", 60],
                ["Nov", 12],
                ["Dec", 50]
            ]
        }, {
            "label": "Commits",
            "color": "#7266ba",
            "data": [
                ["Jan", 20],
                ["Feb", 70],
                ["Mar", 30],
                ["Apr", 50],
                ["May", 85],
                ["Jun", 43],
                ["Jul", 96],
                ["Aug", 36],
                ["Sep", 80],
                ["Oct", 10],
                ["Nov", 72],
                ["Dec", 31]
            ]
        }],
        splineOptions: {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.5
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: (label, x, y) => x + ' : ' + y
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                min: 0,
                max: 150, // optional: use it for a clear represetation
                tickColor: '#eee',
                //position: 'right' or 'left',
                tickFormatter: v => v
            },
            shadowSize: 0
        },

        // Chart bar Stacked
        barStackedData: [{
            "label": "Pending",
            "color": "#9289ca",
            "data": [
                ["Pj1", 86],
                ["Pj2", 136],
                ["Pj3", 97],
                ["Pj4", 110],
                ["Pj5", 62],
                ["Pj6", 85],
                ["Pj7", 115],
                ["Pj8", 78],
                ["Pj9", 104],
                ["Pj10", 82],
                ["Pj11", 97],
                ["Pj12", 110],
                ["Pj13", 62]
            ]
        }, {
            "label": "Assigned",
            "color": "#7266ba",
            "data": [
                ["Pj1", 49],
                ["Pj2", 81],
                ["Pj3", 47],
                ["Pj4", 44],
                ["Pj5", 100],
                ["Pj6", 49],
                ["Pj7", 94],
                ["Pj8", 44],
                ["Pj9", 52],
                ["Pj10", 17],
                ["Pj11", 47],
                ["Pj12", 44],
                ["Pj13", 100]
            ]
        }, {
            "label": "Completed",
            "color": "#564aa3",
            "data": [
                ["Pj1", 29],
                ["Pj2", 56],
                ["Pj3", 14],
                ["Pj4", 21],
                ["Pj5", 5],
                ["Pj6", 24],
                ["Pj7", 37],
                ["Pj8", 22],
                ["Pj9", 28],
                ["Pj10", 9],
                ["Pj11", 14],
                ["Pj12", 21],
                ["Pj13", 5]
            ]
        }],
        barStackedOptions: {
            series: {
                stack: true,
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.6,
                    fill: 0.9
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: (label, x, y) => x + ' : ' + y
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                // position: 'right' or 'left'
                tickColor: '#eee'
            },
            shadowSize: 0
        },

        dropdownTranslateOpen: false,
        dropdownCardOpen: false,
        dropdownChartOpen: false
    }

    toggleDDTranslate = () => {
        this.setState({
            dropdownTranslateOpen: !this.state.dropdownTranslateOpen
        });
    }

    toggleDD = () => {
        this.setState({
            dropdownCardOpen: !this.state.dropdownCardOpen
        });
    }

    toggleDDChart = () => {
        this.setState({
            dropdownChartOpen: !this.state.dropdownChartOpen
        });
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }
    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        this.props.onGetOrganizations();
        this.props.getProjects();
        this.props.getClient();
        this.props.getVendor();
        this.props.getUsers();
    }
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Dashboard
                        <small>Welcome to My Reporting !</small>
                        {/* <small><Trans i18nKey='dashboard.WELCOME'></Trans></small> */}
                    </div>
                </div>

                    <Row>
                    <div className="col-xl-4">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-building fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Organizations</h3>
                                <p className="text-muted">{this.props.orgData.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-4">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-project-diagram fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Projects</h3>
                                <p className="text-muted">{this.props.projects.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-4">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-industry fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Vendors</h3>
                                <p className="text-muted">{this.props.vendorsList.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-blue" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '50%'}}>
                                        <span className="sr-only">30% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-4">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-user-clock fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Clients</h3>
                                <p className="text-muted">{this.props.clientsList.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                                        <span className="sr-only">40% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-4">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fas fa-users fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Users</h3>
                                <p className="text-muted">{this.props.allUsers.length}</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
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
        orgData: state.organization.orgData,
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardV2);

// export default withNamespaces('translations')(DashboardV2);
