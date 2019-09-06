import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from "jquery"
import { Link } from "react-router-dom"
import {Container,Card, CardBody, Modal,ModalHeader,ModalBody,ModalFooter, Button} from 'reactstrap';
import * as vendorActions from '../../store/actions/vendor';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';

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
    componentDidUpdate() {
        if (this.props.vendorsList && this.props.vendorsList.length > 0) {
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
    handleOk = () => {

        let orgId = this.props.orgData.orgResult._id
        let id = this.state.deleteId
        this.props.deleteVendor(id)
        this.setState({ modal: false })
       setTimeout(()=>{
        this.props.getVendor(orgId)
       }, 1000/2)
    }
    handleDelete = (vendor) =>{

        this.setState({ modal: true,deleteId :vendor._id });
    }
    render() {

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Vendors
                        </div>
                    </div>
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
                                                                <td><Link to = {{ pathname : "/addVendor" , state : vendor}}><i className="fa fa-edit text-warning"></i></Link>&nbsp;
                                                                <i className="fa fa-trash text-danger cursor" onClick={this.handleDelete.bind(this, vendor)}></i></td>

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
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>ADD CLIENT</ModalHeader>
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
