import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';
import * as clientActions from '../../store/actions/client';
import { connect } from 'react-redux';
import $ from "jquery";
class ManageClients extends Component {
    componentDidMount() {
        this.props.getClient();
    }
    componentDidUpdate() {
        if (this.props.clientsList && this.props.clientsList.length > 0) {
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClient: (event) => dispatch(clientActions.getClient(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClients);
