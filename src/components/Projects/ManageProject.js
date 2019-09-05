import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';

import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import * as projectActions from '../../store/actions/projectActions';

class ManageProjects extends Component {

    componentDidMount () {

        let orgId = this.props.orgData._id
        this.props.getProjects(orgId);
        $().ready(() => {
            $("#projectsTable").DataTable();
        })
    }


    render() {

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Projects
                        </div>
                    </div>
                    <Card className="card-default" >
                        <CardBody>
                            <Container fluid>
                                {/* DATATABLE DEMO 1 */}
                                <Card>

                                    <CardBody>
                                            <table className="table table-striped my-4 w-100" id = "projectsTable">
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
                                                    {this.props.projects.map((project, i) => {
                                                        return (
                                                            <tr key = {i}>
                                                                <td>{i+1}</td>
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
       orgData: state.organization.orgResult,
       projects : state.projects.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjects: (event) => dispatch(projectActions.getProjects(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageProjects);