import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import FormValidator from '../Forms/FormValidator';


class ClientStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
      formDemo: {
        text: '',
        email: '',
        number: '',
        integer: '',
        alphanum: '',
        url: '',
        password: '',
        password2: '',
        minlength: '',
        maxlength: '',
        length: '',
        minval: '',
        maxval: '',
        list: ''
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
  render() {
    return (
      <div>
        <Row>
          <div className="col-md-12">
            <form onSubmit={this.onSubmit} action="" name="formDemo">
              {/* <legend className="mb-4">Type validation</legend> */}
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Name</label>
                  <Col md={5}>
                    <Input type="text"
                      name="text"
                      invalid={this.hasError('formDemo', 'text', 'required')}
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.formDemo.text}
                    />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Designation</label>
                  <Col md={5}>
                    <Input type="text"
                      name="text"
                      invalid={this.hasError('formDemo', 'text', 'required')}
                      onChange={this.validateOnChange}
                      data-validate='["required"]'
                      value={this.state.formDemo.text}
                    />
                    <span className="invalid-feedback">Field is required</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Office Number</label>
                  <Col md={5}>
                    <Input type="email"
                      name="email"
                      invalid={this.hasError('formDemo', 'email', 'required') || this.hasError('formDemo', 'email', 'email')}
                      onChange={this.validateOnChange}
                      data-validate='["required", "email"]'
                      value={this.state.formDemo.email} />
                    {this.hasError('formDemo', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('formDemo', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                  </Col>
                  <label className="col-md-1 col-form-label">Mobile Number</label>
                  <Col md={5}>
                    <Input type="email"
                      name="email"
                      invalid={this.hasError('formDemo', 'email', 'required') || this.hasError('formDemo', 'email', 'email')}
                      onChange={this.validateOnChange}
                      data-validate='["required", "email"]'
                      value={this.state.formDemo.email} />
                    {this.hasError('formDemo', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                    {this.hasError('formDemo', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}
                  </Col>                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Email Id</label>
                  <Col md={5}>
                    <Input type="text"
                      name="number"
                      invalid={this.hasError('formDemo', 'number', 'number')}
                      onChange={this.validateOnChange}
                      data-validate='["number"]'
                      value={this.state.formDemo.number} />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Owner</label>
                  <Col md={5}>
                    <Input type="text"
                      name="number"
                      invalid={this.hasError('formDemo', 'number', 'number')}
                      onChange={this.validateOnChange}
                      data-validate='["number"]'
                      value={this.state.formDemo.number} />
                    <span className="invalid-feedback">Field must be valid number</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Street Address</label>
                  <Col md={5}>
                    <Input type="text"
                      name="integer"
                      invalid={this.hasError('formDemo', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      data-validate='["integer"]'
                      value={this.state.formDemo.integer} />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Country</label>
                  <Col md={5}>
                    <Input type="text"
                      name="integer"
                      invalid={this.hasError('formDemo', 'integer', 'integer')}
                      onChange={this.validateOnChange}
                      data-validate='["integer"]'
                      value={this.state.formDemo.integer} />
                    <span className="invalid-feedback">Field must be an integer</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">State</label>
                  <Col md={5}>
                    <Input type="text"
                      name="alphanum"
                      invalid={this.hasError('formDemo', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      data-validate='["alphanum"]'
                      value={this.state.formDemo.alphanum} />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                  <label className="col-md-1 col-form-label">City</label>
                  <Col md={5}>
                    <Input type="text"
                      name="alphanum"
                      invalid={this.hasError('formDemo', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      data-validate='["alphanum"]'
                      value={this.state.formDemo.alphanum} />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Zipcode</label>
                  <Col md={5}>
                    <Input type="text"
                      name="alphanum"
                      invalid={this.hasError('formDemo', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      data-validate='["alphanum"]'
                      value={this.state.formDemo.alphanum} />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                  <label className="col-md-1 col-form-label">LinkedIn Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="alphanum"
                      invalid={this.hasError('formDemo', 'alphanum', 'alphanum')}
                      onChange={this.validateOnChange}
                      data-validate='["alphanum"]'
                      value={this.state.formDemo.alphanum} />
                    <span className="invalid-feedback">Field must be alpha numeric</span>
                  </Col>
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group row align-items-center">
                  <label className="col-md-1 col-form-label">Facebook Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="url"
                      invalid={this.hasError('formDemo', 'url', 'url')}
                      onChange={this.validateOnChange}
                      data-validate='["url"]'
                      value={this.state.formDemo.url} />
                    <span className="invalid-feedback">Field must be valid url</span>
                  </Col>
                  <label className="col-md-1 col-form-label">Twitter Profile URL</label>
                  <Col md={5}>
                    <Input type="text"
                      name="url"
                      invalid={this.hasError('formDemo', 'url', 'url')}
                      onChange={this.validateOnChange}
                      data-validate='["url"]'
                      value={this.state.formDemo.url} />
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
