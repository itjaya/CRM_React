import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import ContentWrapper from '../Layout/ContentWrapper';
import * as orgActions from '../../store/actions/orgActions';
import Datatable from '../Tables/Datatable';

class ManageOrganization extends Component {

    state = {
        organizations: []
    }

    componentDidMount() {
        this.props.onGetOrganizations();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.orgData !== this.props.orgData) {
            this.setState({ organizations: this.props.orgData.orgData })
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
                        <div>Organizations
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Organizations</li>
                  </ol>
                    <Card className="card-default" >
                        <CardBody>
                            <Container fluid>
                                <table className="table table-striped my-4 w-100" id="usersTable">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Organization Name</th>
                                            <th>Email Id</th>
                                            <th className="sort-alpha">Conatct Person</th>
                                            <th>Phone No</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.organizations.map((org, i) => {
                                            return (
                                                <tr className="gradeX" key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{org.organizationName}</td>
                                                    <td>{org.orgEmail}</td>
                                                    <td>{org.personName}</td>
                                                    <td>{org.orgPhNo}</td>
                                                    <td><Link to={{ pathname: "/viewOrganization" }}>View</Link></td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>

                            </Container>
                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orgData: state.organization
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrganizations: (event) => dispatch(orgActions.getOrganization(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageOrganization);