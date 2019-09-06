import React, { Component } from 'react';
import {Container,Card, CardBody, Modal,ModalHeader,ModalBody,ModalFooter, Button} from 'reactstrap';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import { Link } from "react-router-dom"
import * as clientActions from '../../store/actions/client';
import { connect } from 'react-redux';
import $ from "jquery";
class ManageClients extends Component {
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
        this.props.getClient(orgId);
    }
    componentDidUpdate() {
        if (this.props.clientsList && this.props.clientsList.length > 0) {
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
        this.props.deleteClient(id)
        this.setState({ modal: false })
       setTimeout(()=>{
        this.props.getClient(orgId);
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
                        <div>Clients
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
                                                        <th data-priority="1">clientName</th>
                                                        <th>contactNumber</th>
                                                        <th>email</th>
                                                        <th className="sort-numeric">state</th>
                                                        <th className="sort-alpha" data-priority="2">zipcode</th>
                                                        <th className="sort-alpha" data-priority="2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.clientsList.map((data, i)=>{
                                                        return(
                                                            <tr key={i}>
                                                                <td>{data.clientName}</td>
                                                                <td>{data.contactNumber}</td>
                                                                <td>{data.emailId}</td>
                                                                <td>{data.state}</td>
                                                                <td>{data.zipcode}</td>
                                                                <td><Link to = {{ pathname : "/addClient" , state : data}}><i className="fa fa-edit"></i></Link>&nbsp;
                                                                <i className="fa fa-trash text-danger cursor" onClick={this.handleDelete.bind(this, data)}></i></td>
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
       clientsList: state.clientReducer.clientData,
       orgData: state.organization

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClient: (event) => dispatch(clientActions.getClient(event)),
        deleteClient : (event) => dispatch(clientActions.deleteClient(event))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClients);
