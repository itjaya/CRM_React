import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import $ from 'jquery';
import 'jquery-validation/dist/jquery.validate.js';


class organizationStep1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      organizationStep1: {
        organizationName: '',
        website: '',
        description: '',
        orgEmail: '',
        orgPhNo: '',
        orgFaxNo: '',
        stAddress1: '',
        stAddress2: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        type: '',
        personName : ''
      }
    };
  }

  isValidated() {
    const form = $(this.refs.organizationStep1);

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
      }
    });
  }

  componentDidMount () {
    if(this.props !== undefined) {
      this.setState({organizationStep1 : this.props.wizardData})
    }
  }


  render() {
    return (
      <div>
        <Row>
          <div className="col-md-12">
            <form name="organizationStep1" ref = "organizationStep1">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Organization Name </label>
                  <Col md={5}>
                    <Input type="text"
                      name="organizationName"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.organizationName || ""}
                      className = "required"
                    />
                  </Col>
                  <label className="col-md-1 col-form-label">Website</label>
                  <Col md={5}>
                    <Input type="text"
                      name="website"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.website || ""}
                      className = "required"
                    />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Description</label>
                  <Col md={11}>
                    <Input type="textarea"
                      name="description"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.description  || ""}
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
                      name="orgEmail"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.orgEmail || ""}
                      className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">Phone No</label>
                  <Col md={5}>
                    <Input type="number"
                      name="orgPhNo"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.orgPhNo || ""}
                      className = "required"
                      />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Alternate Ph No</label>
                  <Col md={5}>
                    <Input type="number"
                      name="altPhNo"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.altPhNo || ""}
                    //   className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">Fax No</label>
                  <Col md={5}>
                    <Input type="number"
                      name="orgFaxNo"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.orgFaxNo || ""}
                      className = "required"
                      />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address 1</label>
                  <Col md={5}>
                    <Input type="text"
                      name="stAddress1"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.stAddress1 || ""}
                      className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">Street Address 2</label>
                  <Col md={5}>
                    <Input type="text"
                      name="stAddress2"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.stAddress2 || ""}
                      className = "required"
                      />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="country"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.country || ""}
                      className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">State</label>
                  <Col md={5}>
                    <Input type="text"
                      name="state"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.state || ""}
                      className = "required"
                      />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="city"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.city || ""}
                      className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">Zipcode</label>
                  <Col md={5}>
                    <Input type="text"
                      name="zipcode"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.zipcode || ""}
                      className = "required"
                      />
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Organization Type</label>
                  <Col md={5}>
                    <Input type="text"
                      name="type"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.type || ""}
                      className = "required"
                      />
                  </Col>
                  <label className="col-md-1 col-form-label">Contact Person Name</label>
                  <Col md={5}>
                    <Input type="text"
                      name="personName"
                      onChange={this.validateOnChange}
                      value={this.state.organizationStep1.personName || ""}
                      className = "required"
                      />
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

export default organizationStep1;