import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from "jquery"
import { Container, Card, CardBody } from 'reactstrap';
import * as vendorActions from '../../store/actions/vendor';
import ContentWrapper from '../Layout/ContentWrapper';
import Datatable from '../Tables/Datatable';

class ManageVendors extends Component {

    componentDidMount() {
        this.props.getVendor();
    }
    componentDidUpdate() {
        if (this.props.vendorsList && this.props.vendorsList.length > 0) {
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
        vendorsList: state.vendorReducer.vendorData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVendor: (event) => dispatch(vendorActions.getVendor(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageVendors);
