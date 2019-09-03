import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Card, CardBody } from 'reactstrap';

import ReactWizard from 'react-bootstrap-wizard';

import ClientStep1 from './ClientStep1';
import ClientStep2 from './ClientStep2';

class AddClient extends Component {

    finishButtonClick(allStates) {
        console.log(allStates);
      }

    render() {

        var steps = [
            // this step hasn't got a isValidated() function, so it will be considered to be true
            { stepName: "Business Information", component: ClientStep1 },
            // this step will be validated to false
            { stepName: "Contact Details", component: ClientStep2 },
          ];

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Client
                        {/* <small>Form validation based on Controlled Components.</small> */}
                        </div>
                    </div>
                    <Card className="card-default" >
                        <CardBody>
                            <ReactWizard
                                navSteps
                                steps={steps}
                                description=""
                                headerTextCenter
                                validate={true}
                                color="primary"
                                finishButtonClick={this.finishButtonClick}
                            />
                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

export default AddClient;
