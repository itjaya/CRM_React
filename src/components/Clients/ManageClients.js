import React, { Component } from 'react';
import { Row, Col, Container, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import { Link } from "react-router-dom"
import * as clientActions from '../../store/actions/client';
import { connect } from 'react-redux';
import $ from "jquery";
import swal from 'sweetalert';

class ManageClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectCondition: false,
        }
    }
    componentDidMount() {
        let orgId = this.props.orgData.orgResult._id
        this.props.getClient(orgId);
    }
    componentDidUpdate() {
        if (this.props.clientsList && this.props.clientsList.length > 0) {
            $().ready(() => {
                $("#usersTable").DataTable();
            })
        }
    }
    refreshData = () =>{
        let orgId = this.props.orgData.orgResult._id
        this.props.getClient(orgId);
    }
    handleDelete = (client) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this client!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.deleteClient(client._id);
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
                        <div>Clients
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Clients</li>
                  </ol>
                    <Card className="card-default" >
                        <CardBody>
                            <Container fluid>
                                {/* DATATABLE DEMO 1 */}
                                <Card>
                                    <CardBody>
                                        <table className="table table-striped my-4 w-100" id="usersTable">
                                            <thead>
                                                <tr>
                                                    <th data-priority="1">clientName</th>
                                                    <th>contactNumber</th>
                                                    <th>email</th>
                                                    <th className="sort-numeric">state</th>
                                                    <th className="sort-alpha" data-priority="2">zipcode</th>
                                                    <th className="sort-alpha" data-priority="2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.clientsList.map((data, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{data.clientName}</td>
                                                            <td>{data.contactNumber}</td>
                                                            <td>{data.emailId}</td>
                                                            <td>{data.state}</td>
                                                            <td>{data.zipcode}</td>
                                                            <td><Link to={{ pathname: "/addClient", state: data }}><i className="far fa-edit text-warning"></i></Link>&nbsp;
                                                                <i className="far fa-trash-alt text-danger cursor" onClick={this.handleDelete.bind(this, data)}></i></td>
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
        clientsList: state.clientReducer.clientData,
        orgData: state.organization

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClient: (event) => dispatch(clientActions.getClient(event)),
        deleteClient: (event) => dispatch(clientActions.deleteClient(event))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClients);
