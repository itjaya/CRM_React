import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import FormValidator from '../Forms/FormValidator';
import $ from 'jquery';
import 'jquery-validation/dist/jquery.validate.js';

class ClientStep1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientStep1 : {
        clientName: '',
        website: '',
        contactNumber: '',
        email: '',
        country: '',
        streetAddres: '',
        state: '',
        city: '',
        zipcode: '',
        fax: '',
        url: '',
        url1: ''
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

  /* Simplify error check */
  hasError = (formName, inputName, method) => {
    return this.state[formName] &&
      this.state[formName].errors &&
      this.state[formName].errors[inputName] &&
      this.state[formName].errors[inputName][method]
  }

  isValidated() {
    const form = $(this.refs.ClientStep1);

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
            <form ref = "ClientStep1" name="clientStep1">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Client Name</label>
                  <Col md={5}>
                    <Input type="text"
                      name="clientName"
                      onChange={this.validateOnChange}
                      className = "required"
                      value={this.state.clientStep1.clientName}
                    />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Website</label>
                  <Col md={5}>
                    <Input type="text"
                      name="website"
                      onChange={this.validateOnChange}
                      className = "required"
                      value={this.state.clientStep1.website}
                    />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Email Id</label>
                  <Col md={5}>
                    <Input type="email"
                      name="email"
                      onChange={this.validateOnChange}
                      className = "required"
                       value={this.state.clientStep1.email} 
                        />
                    {/* {this.hasError('clientStep1', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('clientStep1', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>} */}
                  </Col>
                  <label className="col-md-1 col-form-label">Contact Number</label>
                  <Col md={5}>
                    <Input type="number"
                      name="contactNumber"
                      // invalid={this.hasError('clientStep1', 'email', 'required') || this.hasError('clientStep1', 'email', 'email')}
                      onChange={this.validateOnChange}
                      // data-validate='["required", "email"]'
                      className = "required"
                      value={this.state.clientStep1.contactNumber} 
                      />
                    {/* {this.hasError('clientStep1', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('clientStep1', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>} */}
                  </Col>                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address</label>
                  <Col md={5}>
                    <Input type="text"
                      name="streetAddres"
                      // invalid={this.hasError('clientStep1', 'number', 'number')}
                      onChange={this.validateOnChange}
                      // data-validate='["number"]'
                      className = "required"
                      value={this.state.clientStep1.streetAddres}
                       />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="country"
                      // invalid={this.hasError('clientStep1', 'number', 'number')}
                      onChange={this.validateOnChange}
                      // data-validate='["number"]'
                      className = "required"
                      // value={this.state.clientStep1.number} 
                      />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">State</label>
                  <Col md={5}>
                    <Input type="text"
                      name="state"
                      // invalid={this.hasError('clientStep1', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      // data-validate='["integer"]'
                      className = "required"
                      value={this.state.clientStep1.state}
                       />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="city"
                      // invalid={this.hasError('clientStep1', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      // data-validate='["integer"]'
                      className = "required"
                      value={this.state.clientStep1.city} 
                      />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Zipcode</label>
                  <Col md={5}>
                    <Input type="number"
                      name="zipcode"
                      // invalid={this.hasError('clientStep1', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      className = "required"
                      value={this.state.clientStep1.zipcode}
                       />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Fax</label>
                  <Col md={5}>
                    <Input type="text"
                      name="fax"
                      // invalid={this.hasError('clientStep1', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      // data-validate='["alphanum"]'
                      className = "required"
                      value={this.state.clientStep1.fax} 
                      />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                </div>
              </fieldset>
            </form>
          </div>
        </Row>
      </div>
    )
  }
}

export default ClientStep1;