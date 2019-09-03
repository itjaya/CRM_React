import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import ReactWizard from 'react-bootstrap-wizard';

import OrganizationStep1 from './OrganizationStep1';
import * as orgActions from '../../store/actions/orgActions';

class AddOrganization extends Component {

    state = {
        redirect : false,
    }

    finishButtonClick = (allStates) => {
        let postData = allStates.General_Information.organizationStep1
        this.props.onAddOrganization(postData)
    }

    componentDidUpdate (prevProps) {
        if(prevProps.orgData !== this.props.orgData) {
            if(this.props.orgData.addLoading) {
                this.setState({ redirect : true })
            }
        }
    }

    render () {

        if(this.state.redirect) {
            return <Redirect to = "/manageOrganizations"/>
        }

        var steps = [
            { stepName: "General_Information", component: OrganizationStep1 },
        ];
        return (
            <div>   
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Organization
                        {/* <small>Form validation based on Controlled Components.</small> */}
                        </div>
                    </div>
                    <Card className="card-default">
                        <CardBody>
                            <ReactWizard
                                steps={steps}
                                description=""
                                headerTextCenter
                                validate={true}
                                color="primary"
                                finishButtonClick={this.finishButtonClick}
                                finishButtonText = "Save"
                            />
                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orgData : state.organization
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddOrganization : event => dispatch(orgActions.addOrganization(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);