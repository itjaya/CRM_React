import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import FormValidator from '../Forms/FormValidator';
import $ from 'jquery';
import 'jquery-validation/dist/jquery.validate.js';

class ClientStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientStep2 : {
        contactName: '',
        designation: '',
        mobileNumber: '',
        owner: '',
        country: '',
        city: '',
        linkedInProfile: '',
        twitterProfile: '',
        facebookProfile: '',
        zipCode: '',
        state: '',
        intstreetAddress: '',
        officeNumber: '',
        email: ''
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
  isValidated() {
    // do some validations
    // decide if you will
    return true;
    // or you will
    // return false;
  }
  /* Simplify error check */
  hasError = (formName, inputName, method) => {
    return this.state[formName] &&
      this.state[formName].errors &&
      this.state[formName].errors[inputName] &&
      this.state[formName].errors[inputName][method]
  }
  isValidated() {
    const form = $(this.refs.ClientStep2);

    if (form.valid()) {
      return true;
    }
    else {
      return false;
      // return true;
    }

  }

  validateOnChange = event => {

    // console.log("event", event)
    const input = event.target;
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({
      [form.name]: {
        ...this.state[form.name],
        [input.name]: value,
        // errors: {
        //     ...this.state[form.name].errors,
        //     [input.name]: result
        // }
      }
    });


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
            <form ref = "ClientStep2" name="clientStep2">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Name</label>
                  <Col md={5}>
                    <Input type="text"
                      name="contactName"
                      // invalid={this.hasError('clientStep2', 'text', 'required')}
                      onChange={this.validateOnChange}
                      // data-validate='["required"]'
                      className = "required"
                      value={this.state.clientStep2.contactName}
                      // className = "required"
                    />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Designation</label>
                  <Col md={5}>
                    <Input type="text"
                      name="designation"
                      // invalid={this.hasError('clientStep2', 'text', 'required')}
                      onChange={this.validateOnChange}
                      // data-validate='["required"]'
                      className = "required"
                      value={this.state.clientStep2.designation}
                    />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Office Number</label>
                  <Col md={5}>
                    <Input type="tel"
                      name="officeNumber"
                      // invalid={this.hasError('clientStep2', 'email', 'required') || this.hasError('clientStep2', 'email', 'email')}
                      onChange={this.validateOnChange}
                      // data-validate='["required", "email"]'
                      value={this.state.clientStep2.officeNumber}
                      className = "required"
                      />
                    {/* {this.hasError('clientStep2', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('clientStep2', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>} */}
                  </Col>
                  <label className="col-md-1 col-form-label">Mobile Number</label>
                  <Col md={5}>
                    <Input type="tel"
                      name="mobileNumber"
                      // invalid={this.hasError('clientStep2', 'email', 'required') || this.hasError('clientStep2', 'email', 'email')}
                      onChange={this.validateOnChange}
                      // data-validate='["required", "email"]'
                      value={this.state.clientStep2.mobileNumber} 
                      className = "required"
                      />
                    {/* {this.hasError('clientStep2', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('clientStep2', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>} */}
                  </Col>                
                  </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Email Id</label>
                  <Col md={5}>
                    <Input type="email"
                      name="email"
                      // invalid={this.hasError('clientStep2', 'number', 'number')}
                      onChange={this.validateOnChange}
                      // data-validate='["number"]'
                      value={this.state.clientStep2.email} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Owner</label>
                  <Col md={5}>
                    <Input type="text"
                      name="owner"
                      // invalid={this.hasError('clientStep2', 'number', 'number')}
                      onChange={this.validateOnChange}
                      // data-validate='["number"]'
                      value={this.state.clientStep2.owner} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address</label>
                  <Col md={5}>
                    <Input type="text"
                      name="intstreetAddress"
                      // invalid={this.hasError('clientStep2', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      // data-validate='["integer"]'
                      value={this.state.clientStep2.intstreetAddress}
                      className = "required"
                       />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="country"
                      // invalid={this.hasError('clientStep2', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      // data-validate='["integer"]'
                      value={this.state.clientStep2.country} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">State</label>
                  <Col md={5}>
                    <Input type="text"
                      name="state"
                      // invalid={this.hasError('clientStep2', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      value={this.state.clientStep2.state} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="city"
                      // invalid={this.hasError('clientStep2', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      value={this.state.clientStep2.City} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Zipcode</label>
                  <Col md={5}>
                    <Input type="number"
                      name="zipCode"
                      // invalid={this.hasError('clientStep2', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      value={this.state.clientStep2.zipCode} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                  <label className="col-md-1 col-form-label">LinkedIn Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="linkedInProfile"
                      // invalid={this.hasError('clientStep2', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      value={this.state.clientStep2.linkedInProfile} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Facebook Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="facebookProfile"
                      // invalid={this.hasError('clientStep2', 'url', 'url')}
                      onChange={this.validateOnChange}
                      // data-validate='["url"]'
                      value={this.state.clientStep2.facebookProfile} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be valid url</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Twitter Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="twitterProfile"
                      // invalid={this.hasError('clientStep2', 'url', 'url')}
                      onChange={this.validateOnChange}
                      // data-validate='["url"]'
                      value={this.state.clientStep2.twitterProfile} 
                      className = "required"
                      />
                    <span className="invalid-feedback">Field must be valid url</span>
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

export default ClientStep2;
