import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import FormValidator from '../Forms/FormValidator';
import $ from 'jquery';

class VendorStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
      vendorStep2: {
        personName: '',
        designation: '',
        officeNo: '',
        mobileNo: '',
        emailId: '',
        owner: '',
        streetAddress: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        linkedInUrl: '',
        facebookUrl: '',
        twitterUrl: ''
      }
    };
  }

  validateOnChange = event => {
    const input = event.target;
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value;

    const result = FormValidator.validate(input);

    this.setState({
        [form.name]: {
            ...this.state[form.name],
            [input.name]: value,
            errors: {
                ...this.state[form.name].errors,
                [input.name]: result
            }
        }
    });

}
componentDidMount () {
  if(this.props.wizardData.contacts !== undefined) {
    // console.log("haiii", this.props.wizardData.contacts)
    this.setState({vendorStep2 : this.props.wizardData.contacts[0]})
  }
}
  isValidated() {
    const form = $(this.refs.vendorStep2);

    if (form.valid()) {
      return true;
    }
    else {
      return false;
    }
  }
  /* Simplify error check */
  hasError = (formName, inputName, method) => {
    return this.state[formName] &&
      this.state[formName].errors &&
      this.state[formName].errors[inputName] &&
      this.state[formName].errors[inputName][method]
  }
  render() {
    return (
      <div>
        <Row>
          <div className="col-md-12">
            <form ref = "vendorStep2" name="vendorStep2">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Name</label>
                  <Col md={5}>
                    <Input type="text"
                      name="personName"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.personName}
                    />
                  </Col>
                  <label className="col-md-1 col-form-label">Designation</label>
                  <Col md={5}>
                    <Input type="text"
                      name="designation"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.designation}
                    />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Office Number</label>
                  <Col md={5}>
                    <Input type="number"
                      name="officeNo"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.officeNo} />
                  </Col>
                  <label className="col-md-1 col-form-label">Mobile Number</label>
                  <Col md={5}>
                    <Input type="number"
                      name="mobileNo"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.mobileNo} />
                  </Col>                
                  </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Email Id</label>
                  <Col md={5}>
                    <Input type="email"
                      name="emailId"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.emailId} />
                  </Col>
                  <label className="col-md-1 col-form-label">Owner</label>
                  <Col md={5}>
                    <Input type="text"
                      name="owner"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.owner} />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address</label>
                  <Col md={5}>
                    <Input type="text"
                      name="streetAddress"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.streetAddress} />
                  </Col>
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="country"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.country} />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">State</label>
                  <Col md={5}>
                    <Input type="text"
                      name="state"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.state} />
                  </Col>
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="city"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.city} />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Zipcode</label>
                  <Col md={5}>
                    <Input type="number"
                      name="zipcode"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.zipcode} />
                  </Col>
                  <label className="col-md-1 col-form-label">LinkedIn Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="linkedInUrl"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.linkedInUrl} />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Facebook Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="facebookUrl"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.facebookUrl} />
                  </Col>
                  <label className="col-md-1 col-form-label">Twitter Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="twitterUrl"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep2.twitterUrl} />
                  </Col>
                </div>
              </fieldset>
            </form>
          </div>
        </Row>
      </div>
    );
  }
}

export default VendorStep2;
