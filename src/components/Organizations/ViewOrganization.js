import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import FormValidator from '../Forms/FormValidator';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row, Input, ListGroup, ListGroupItem, TabContent, TabPane } from 'reactstrap';
import 'bootstrap-filestyle';
import $ from 'jquery';
import moment from 'moment';
import DataTable from '../Tables/Datatable';

import * as userActions from '../../store/actions/userActions';
import * as projActions from '../../store/actions/projectActions';
import * as vendorActions from '../../store/actions/vendor';
import * as clientActions from '../../store/actions/client';

class ViewOrganization extends Component {
    state = {
        activeTab: 'users',
        users : [],
        projects : [],
        vendors : [],
        clients : [],
        formDemo: {
            text: '',
            email: '',
            number: '',
            integer: '',
            alphanum: '',
            url: '',
            password: '',
            password2: '',
            minlength: '',
            maxlength: '',
            length: '',
            minval: '',
            maxval: '',
            list: ''
        }
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
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

    componentDidMount () {
        if(this.props.location.state !== undefined) {
            let orgData = this.props.location.state;
            this.props.getUsers(orgData._id);
            this.props.getProjects(orgData._id);
            this.props.getVendors(orgData._id);
            this.props.getClients(orgData._id);
        }
    }

    componentDidUpdate (prevProps) {
        if(prevProps.userData !== this.props.userData) {
            this.setState({ users : this.props.userData })
            $().ready(() => {
                $("#usersTable").DataTable();
            });
        }
        if(prevProps.projects !== this.props.projects) {
            this.setState({ projects : this.props.projects });
            $().ready(() => {
                $("#projectsTable").DataTable();
            })
        }
        if(prevProps.vendors !== this.props.vendors) {
            this.setState({ vendors : this.props.vendors });
            $().ready(() => {
                $("#vendorTable").DataTable();
            })
        }
        if(prevProps.clients !== this.props.clients) {
            this.setState({ clients : this.props.clients });
            $().ready(() => {
                $("#clientsTable").DataTable();
            })
        }
    }

    render () {
        let array = [];
        return (
            <div>
                <ContentWrapper>
                <div className="content-heading">
                        <div>{this.props.location.state.organizationName}
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item"><Link to = "/manageOrganizations">Organizations</Link></li>
                      <li className="breadcrumb-item active">View Organization</li>
                  </ol>
                    {/* <div className="container-md"> */}
                        <Row>
                            <Col lg="2">
                                <div className="card b">
                                    {/* <div className="card-header bg-gray-lighter text-bold">Personal Settings</div> */}
                                    <ListGroup>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'users' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('users'); }}>
                                            Users
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'projects' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('projects'); }}>
                                            Projects
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'vendors' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('vendors'); }}>
                                            Vendors
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'clients' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('clients'); }}>
                                            Clients
                                    </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Col>
                            <Col lg="10">
                                <TabContent activeTab={this.state.activeTab} className="p-0 b0" style = {{ padding : "0px"}}>
                                    <TabPane tabId="users">
                                        <Card className="card-default" >
                                        <CardBody>
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
                                                        return (
                                                            <tr className="gradeX" key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{user.firstName}</td>
                                                                <td>{user.lastName}</td>
                                                                <td style={this.state.style}>{array.join(", ")}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.role.value}</td>
                                                                <td><Link to={{ pathname: "/viewUser" }}>View</Link></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </CardBody>
                                        </Card>
                                    </TabPane>
                                <TabPane tabId="projects">
                                    <Card className="card-default" >
                                        <CardBody>
                                            <table className="table table-striped my-4 w-100" id="projectsTable">
                                                <thead>
                                                    <tr>
                                                        <th data-priority="1">S. No</th>
                                                        <th>Project Name</th>
                                                        <th>Vendor Name</th>
                                                        <th className="sort-numeric">Client Name</th>
                                                        <th className="sort-alpha" data-priority="2">Start Date</th>
                                                        <th className="sort-alpha" data-priority="2">End Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.projects.map((project, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{project.projectName}</td>
                                                                <td>{project.vendorId.label}</td>
                                                                <td>{project.clientId.label}</td>
                                                                <td>{moment(project.startDate).format('MM-DD-YYYY')}</td>
                                                                <td>{moment(project.endDate).format('MM-DD-YYYY')}</td>
                                                               </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>
                                </TabPane>
                                    <TabPane tabId="vendors">
                                     <Card className="card-default">
                                         <CardBody>
                                         <table className="table table-striped my-4 w-100" id="vendorTable">
                                                <thead>
                                                    <tr>
                                                        <th data-priority="1">vendor Name</th>
                                                        <th>contact Number</th>
                                                        <th>email</th>
                                                        <th className="sort-numeric">city</th>
                                                        <th className="sort-alpha" data-priority="2">zipcode</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.vendors.map((vendor, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{vendor.vendorName}</td>
                                                                <td>{vendor.contactNumber}</td>
                                                                <td>{vendor.emailId}</td>
                                                                <td>{vendor.city}</td>
                                                                <td>{vendor.zipcode}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                         </CardBody>
                                     </Card>
                                    </TabPane>
                                    <TabPane tabId="clients">
                                        <Card>
                                            <CardBody>
                                            <table className="table table-striped my-4 w-100" id="clientsTable">
                                            <thead>
                                                <tr>
                                                    <th data-priority="1">clientName</th>
                                                    <th>contactNumber</th>
                                                    <th>email</th>
                                                    <th className="sort-numeric">state</th>
                                                    <th className="sort-alpha" data-priority="2">zipcode</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.clients.map((data, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{data.clientName}</td>
                                                            <td>{data.contactNumber}</td>
                                                            <td>{data.emailId}</td>
                                                            <td>{data.state}</td>
                                                            <td>{data.zipcode}</td>
                                                          </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                    
                                </TabContent>
                            </Col>
                        </Row>
                    {/* </div> */}
                </ContentWrapper>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers : (event) => dispatch(userActions.getUsers(event)),
        getProjects : (event) => dispatch(projActions.getProjects(event)),
        getVendors : (event) => dispatch(vendorActions.getVendor(event)),
        getClients : (event) => dispatch(clientActions.getClient(event))
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.allUsers,
        projects: state.projects.projects,
        vendors: state.vendorReducer.vendorData,
        clients: state.clientReducer.clientData,

    }
}

export default connect (mapStateToProps, mapDispatchToProps) (ViewOrganization);