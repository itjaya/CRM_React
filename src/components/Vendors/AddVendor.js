import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Card, CardBody } from 'reactstrap';

import ReactWizard from 'react-bootstrap-wizard';

import VendorStep1 from './VendorStep1';
import VendorStep2 from './VendorStep2';

class AddVendor extends Component {

    finishButtonClick(allStates) {
        console.log(allStates);
      }

    render() {

        var steps = [
            // this step hasn't got a isValidated() function, so it will be considered to be true
            { stepName: "1. Business Information", component: VendorStep1 },
            // this step will be validated to false
            { stepName: "2. Contact Details", component: VendorStep2 },
          ];

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Add Vendor
                        <small>Form validation based on Controlled Components.</small>
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
                            />
                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

export default AddVendor;
