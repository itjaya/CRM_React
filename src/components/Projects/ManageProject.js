import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Container, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
import swal from 'sweetalert';

import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import * as projectActions from '../../store/actions/projectActions';

class ManageProjects extends Component {

    state = {
        projects: [],
        modal: false,

    }

    refreshData = () => {
        let orgId = this.props.orgData._id
        this.props.getProjects(orgId);
    }

    componentDidMount() {
        this.refreshData();
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.projects !== this.props.projects) {
            this.setState({ projects: this.props.projects })
            $().ready(() => {
                $("#projectsTable").DataTable();
            })
        }
        if(prevProps.deleteResult !== this.props.deleteResult) {
            swal({
                text: this.props.deleteResult.msg,
                icon: "success",
                button: "Ok",
              });
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleOk = () => {

        // let orgId = this.props.orgData.orgResult._id
        // let id = this.state.deleteId
        // this.props.deleteClient(id)
        // this.setState({ modal: false })
        // setTimeout(() => {
        //     this.props.getClient(orgId);
        // }, 1000 / 2)
    }

    handleDelete = (project) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this project!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.deleteProject(project._id);
                    setTimeout(() => {
                        this.refreshData();
                    }, 1000);
                } else {
                    swal("Your imaginary file is safe!");
                }
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
                                        <table className="table table-striped my-4 w-100" id="projectsTable">
                                            <thead>
                                                <tr>
                                                    <th data-priority="1">S. No</th>
                                                    <th>Project Name</th>
                                                    <th>Vendor Name</th>
                                                    <th className="sort-numeric">Client Name</th>
                                                    <th className="sort-alpha" data-priority="2">Start Date</th>
                                                    <th className="sort-alpha" data-priority="2">End Date</th>
                                                    <th>Actions</th>
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
                                                            <td ><Link to={{ pathname: "/addProject", state: project }}><i style = {{ color : "#ff902b"}} className="far fa-edit"></i></Link>&nbsp;
                                                                <i className="far fa-trash-alt text-danger cursor" onClick={this.handleDelete.bind(this, project)}></i></td>
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
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}><h4 style={{ "color": "orange" }}>ADD CLIENT</h4></ModalHeader>
                        <ModalBody>
                            Are you sure do you want delete ?
                            </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.handleOk.bind(this)}>Ok</Button>{' '}
                            <Button color="primary" onClick={this.toggleModal}>Cancel</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </ContentWrapper>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orgData: state.organization.orgResult,
        projects: state.projects.projects,
        deleteResult : state.projects.deleteResult
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjects: (event) => dispatch(projectActions.getProjects(event)),
        deleteProject: (event) => dispatch(projectActions.deleteProject(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);