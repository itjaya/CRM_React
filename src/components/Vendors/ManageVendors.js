import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from "jquery"
import { Link } from "react-router-dom"
import {Container,Card, CardBody, Modal,ModalHeader,ModalBody,ModalFooter, Button} from 'reactstrap';
import * as vendorActions from '../../store/actions/vendor';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import swal from 'sweetalert';

class ManageVendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            msg: "",
            deleteId : "",
            condition : false,
            redirectCondition : false
        }
    }
    componentDidMount() {
        let orgId = this.props.orgData.orgResult._id
        this.props.getVendor(orgId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.vendorsList && this.props.vendorsList) {
            $().ready(() => {
                $("#usersTable").DataTable();
            })
        }
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    refreshData = () => {
        let orgId = this.props.orgData.orgResult._id
        this.props.getVendor(orgId);
    }
    handleDelete = (vendor) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this vendor!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.deleteVendor(vendor._id);
                setTimeout(() => {
                    this.refreshData();
                }, 1000);
            } else {
                swal("Your vendor data is safe!");
            }
        })
    }
    render() {

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Vendors
                        </div>
                    </div>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Vendors</li>
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
                                                        <th data-priority="1">vendor Name</th>
                                                        <th>contact Number</th>
                                                        <th>email</th>
                                                        <th className="sort-numeric">city</th>
                                                        <th className="sort-alpha" data-priority="2">zipcode</th>
                                                        <th className="sort-alpha" data-priority="2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.vendorsList.map((vendor, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{vendor.vendorName}</td>
                                                                <td>{vendor.contactNumber}</td>
                                                                <td>{vendor.emailId}</td>
                                                                <td>{vendor.city}</td>
                                                                <td>{vendor.zipcode}</td>
                                                                <td><Link to = {{ pathname : "/addVendor" , state : vendor}}><i className="far fa-edit text-warning"></i></Link>&nbsp;
                                                                <i className="far fa-trash-alt text-danger cursor" onClick={this.handleDelete.bind(this, vendor)}></i></td>

                                                            </tr>
                                                        )
                                                    })
                                                    }
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
        orgData: state.organization,
        vendorsList: state.vendorReducer.vendorData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVendor: (event) => dispatch(vendorActions.getVendor(event)),
        deleteVendor : (event) => dispatch(vendorActions.deleteVendor(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageVendors);
