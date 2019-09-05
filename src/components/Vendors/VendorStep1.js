import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import $ from 'jquery';
import 'jquery-validation/dist/jquery.validate.js';


class VendorStep1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstStep: "first step here",
      vendorStep1: {
        vendorName: '',
        website: '',
        emailId: '',
        contactNumber: '',
        addressStreet: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        category: ''
      }
    };
  }

  isValidated() {
    const form = $(this.refs.vendorStep1);

    if (form.valid()) {
      return true;
    }
    else {
      return false;
      // return true;
    }

  }

  componentDidMount () {
    if(this.props !== undefined) {
      // console.log(this.props.location.state)
      this.setState({vendorStep1 : this.props.wizardData})
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


  render() {
    return (
      <div>
        <Row>
          <div className="col-md-12">
            <form name="vendorStep1" ref = "vendorStep1">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Vendor Name </label>
                  <Col md={5}>
                    <Input type="text"
                      name="vendorName"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep1.vendorName}
                      className = "required"
                    />
                  </Col>
                  <label className="col-md-1 col-form-label">Website</label>
                  <Col md={5}>
                    <Input type="text"
                      name="website"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep1.website}
                      className = "required"
                    />
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
                      value={this.state.vendorStep1.emailId}
                      className = "required"
                      />
                   </Col>
                  <label className="col-md-1 col-form-label">Contact Number</label>
                  <Col md={5}>
                    <Input type="number"
                      name="contactNumber"
                      onChange={this.validateOnChange}
                      value={this.state.vendorStep1.contactNumber}
                      className = "required"
                    />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address</label>
                  <Col md={5}>
                    <Input type="text"
                      name="addressStreet"
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.vendorStep1.addressStreet}
                      className = "required"
                      />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="country"
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.vendorStep1.country}
                      className = "required"
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
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.vendorStep1.state}
                      className = "required"
                      />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="city"
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.vendorStep1.city}
                      className = "required"
                      />
                    <span className="invalid-feedback">Field is required</span>
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
                      data-validate='["required", "alphanum"]'
                      value={this.state.vendorStep1.zipcode}
                      className = "required"
                      />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Category</label>
                  <Col md={5}>
                    <Input type="text"
                      name="category"
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.vendorStep1.category}
                      className = "required"
                      />
                    <span className="invalid-feedback">Field is required</span>
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

export default VendorStep1;