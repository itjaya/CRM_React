import React, { Component } from "react";
import ContentWrapper from '../Layout/ContentWrapper';
import FormValidator from '../Forms/FormValidator';
import { Card, CardBody, Col, Row, Input, ListGroup, ListGroupItem, TabContent, TabPane } from 'reactstrap';
import 'bootstrap-filestyle';


class ViewConsultant extends Component {
    state = {
        activeTab: 'profile',
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
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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

    render() {
        return (
            <div>
                <ContentWrapper>
                    {/* <div className="container-md"> */}
                        <Row>
                            <Col lg="2">
                                <div className="card b">
                                    {/* <div className="card-header bg-gray-lighter text-bold">Personal Settings</div> */}
                                    <ListGroup>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'profile' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('profile'); }}>
                                            Personal Details
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'account' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('account'); }}>
                                            Work Experience
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'emails' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('emails'); }}>
                                            Education Details
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'notifications' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('notifications'); }}>
                                            Certificates
                                    </ListGroupItem>
                                        <ListGroupItem action
                                            className={this.state.activeTab === 'applications' ? 'active' : ''}
                                            onClick={() => { this.toggleTab('applications'); }}>
                                            Documents
                                    </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Col>
                            <Col lg="10">
                                <TabContent activeTab={this.state.activeTab} className="p-0 b0" style = {{ padding : "0px"}}>
                                    <TabPane tabId="profile">
                                        <Card className="card-default" >
                                            <CardBody>
                                                <form onSubmit={this.onSubmit} action="" name="formDemo">
                                                    <legend className="mb-4">Personal Details</legend>
                                                    <fieldset>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-1 col-form-label">First Name</label>
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
                                                            <label className="col-md-1 col-form-label">Middle Name</label>
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
                                                            <label className="col-md-1 col-form-label">Last Name</label>
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
                                                            <label className="col-md-1 col-form-label">Email Id</label>
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
                                                            <label className="col-md-1 col-form-label">Mobile Number</label>
                                                            <Col md={5}>
                                                                <Input type="text"
                                                                    name="number"
                                                                    invalid={this.hasError('formDemo', 'number', 'number')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["number"]'
                                                                    value={this.state.formDemo.number} />
                                                                <span className="invalid-feedback">Field must be valid number</span>
                                                            </Col>
                                                            <label className="col-md-1 col-form-label">Work Number</label>
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
                                                            <label className="col-md-1 col-form-label">SSN</label>
                                                            <Col md={5}>
                                                                <Input type="text"
                                                                    name="integer"
                                                                    invalid={this.hasError('formDemo', 'integer', 'integer')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["integer"]'
                                                                    value={this.state.formDemo.integer} />
                                                                <span className="invalid-feedback">Field must be an integer</span>
                                                            </Col>
                                                            <label className="col-md-1 col-form-label">Work Authorization</label>
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
                                                            <label className="col-md-1 col-form-label">Country</label>
                                                            <Col md={5}>
                                                                <Input type="text"
                                                                    name="alphanum"
                                                                    invalid={this.hasError('formDemo', 'alphanum', 'alphanum')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["alphanum"]'
                                                                    value={this.state.formDemo.alphanum} />
                                                                <span className="invalid-feedback">Field must be alpha numeric</span>
                                                            </Col>
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
                                                        </div>
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group row align-items-center">
                                                            <label className="col-md-1 col-form-label">Marital Status</label>
                                                            <Col md={5}>
                                                                <Input type="text"
                                                                    name="url"
                                                                    invalid={this.hasError('formDemo', 'url', 'url')}
                                                                    onChange={this.validateOnChange}
                                                                    data-validate='["url"]'
                                                                    value={this.state.formDemo.url} />
                                                                <span className="invalid-feedback">Field must be valid url</span>
                                                            </Col>
                                                            <label className="col-md-1 col-form-label">Payroll Id</label>
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

                                                <fieldset>
                                                    <div className="form-group row">
                                                        <div className="col-sm-4 col-sm-offset-2">
                                                            <button type="submit" className="btn btn-danger">Cancel</button>&nbsp;
                                                            <button type="submit" className="btn btn-success">Save</button>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <small>Note: Fill in the mandatory fields, and click Save. User gets email invitation sent to the email id mentioned. Once the invitation is accepted, the user becomes part of the organization.</small>
                                                </form>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="account">
                                        <div className="card b">
                                            <div className="card-header bg-gray-lighter text-bold">Account</div>
                                            <div className="card-body">
                                                <form action="">
                                                    <div className="form-group">
                                                        <label>Current password</label>
                                                        <input className="form-control" type="password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>New password</label>
                                                        <input className="form-control" type="password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm new password</label>
                                                        <input className="form-control" type="password" />
                                                    </div>
                                                    <button className="btn btn-info" type="button">Update password</button>
                                                    <p>
                                                        <small className="text-muted">* Integer fermentum accumsan metus, id sagittis ipsum molestie vitae</small>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card b">
                                            <div className="card-header bg-danger text-bold">Delete account</div>
                                            <div className="card-body bt">
                                                <p>You will be asked for confirmation before delete account.</p>
                                                <button className="btn btn-secondary" type="button">
                                                    <span className="text-danger">Delete account</span>
                                                </button>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="emails">
                                        <div className="card b">
                                            <div className="card-header bg-gray-lighter text-bold">Emails</div>
                                            <div className="card-body">
                                                <p>Etiam eros nibh, condimentum in auctor et, aliquam quis elit. Donec id libero eros. Ut fringilla, justo id fringilla pretium, nibh nunc suscipit mauris, et suscipit nulla nisl ac dolor. Nam egestas, leo eu gravida tincidunt, sem ipsum pellentesque quam, vel iaculis est quam et eros.</p>
                                                <p>
                                                    <strong>Your email addresses</strong>
                                                </p>
                                                <p>
                                                    <span className="mr-2">email@someaddress.com</span>
                                                    <span className="badge badge-success">primary</span>
                                                </p>
                                                <p>
                                                    <span className="mr-2">another.email@someaddress.com</span>
                                                    <span className="badge bg-gray">private</span>
                                                </p>
                                            </div>
                                            <div className="card-body bt">
                                                <p>
                                                    <strong>Add email address</strong>
                                                </p>
                                                <form action="">
                                                    <Row className="mb-2">
                                                        <Col xl="6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <input className="form-control" type="email" placeholder="email@server.com" />
                                                                    <span className="input-group-btn">
                                                                        <button className="btn btn-secondary" type="button">Add</button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" id="defaultCheck1" type="checkbox" value="" />
                                                                <label className="form-check-label">Keep my email address private</label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <button className="btn btn-info" type="button">Update email</button>
                                                    <p>
                                                        <small className="text-muted">* Integer fermentum accumsan metus, id sagittis ipsum molestie vitae</small>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="notifications">
                                        <form action="">
                                            <div className="card b">
                                                <div className="card-header bg-gray-lighter text-bold">Notifications</div>
                                                <div className="card-body bb">
                                                    <div className="form-check">
                                                        <input className="form-check-input" id="defaultCheck2" type="checkbox" value="" />
                                                        <label className="form-check-label">
                                                            <strong>Disable email notifications</strong>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <p>
                                                        <strong>Interaction</strong>
                                                    </p>
                                                    <div className="form-check">
                                                        <input className="form-check-input" id="defaultCheck3" type="checkbox" value="" />
                                                        <label className="form-check-label">Alert me when someone start to follow me</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" id="defaultCheck4" type="checkbox" value="" />
                                                        <label className="form-check-label">Alert me when someone star my work</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" id="defaultCheck5" type="checkbox" value="" />
                                                        <label className="form-check-label">Alert me when post a new comment</label>
                                                    </div>
                                                    <p className="my-2">
                                                        <strong>Marketing</strong>
                                                    </p>
                                                    <div className="form-check mb-2">
                                                        <input className="form-check-input" id="defaultCheck6" type="checkbox" value="" />
                                                        <label className="form-check-label">Send me news and interesting updates</label>
                                                    </div>
                                                    <button className="mb-3 btn btn-info" type="button">Update notifications</button>
                                                    <p>
                                                        <small className="text-muted">Mauris sodales accumsan erat, ut dapibus erat faucibus vitae.</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </form>
                                    </TabPane>
                                    <TabPane tabId="applications">
                                        <div className="card b">
                                            <div className="card-header bg-gray-lighter text-bold">Applications</div>
                                            <div className="card-body">
                                                <p>
                                                    <span>You have granted access for</span>
                                                    <strong>3 applications</strong>
                                                    <span>to your account.</span>
                                                </p>
                                                <ListGroup>
                                                    <ListGroupItem className="d-flex align-items-center">
                                                        <img className="mr-2 img-fluid thumb48" src="img/dummy.png" alt="App" />
                                                        <div>
                                                            <p className="text-bold mb-0">Application #1</p>
                                                            <small>Ut turpis urna, tristique sed adipiscing nec, luctus quis leo.</small>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <button className="btn btn-secondary" type="button">
                                                                <strong>Revoke</strong>
                                                            </button>
                                                        </div>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="d-flex align-items-center">
                                                        <img className="mr-2 img-fluid thumb48" src="img/dummy.png" alt="App" />
                                                        <div>
                                                            <p className="text-bold mb-0">Application #2</p>
                                                            <small>Ut turpis urna, tristique sed adipiscing nec, luctus quis leo.</small>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <button className="btn btn-secondary" type="button">
                                                                <strong>Revoke</strong>
                                                            </button>
                                                        </div>
                                                    </ListGroupItem>
                                                    <ListGroupItem className="d-flex align-items-center">
                                                        <img className="mr-2 img-fluid thumb48" src="img/dummy.png" alt="App" />
                                                        <div>
                                                            <p className="text-bold mb-0">Application #3</p>
                                                            <small>Ut turpis urna, tristique sed adipiscing nec, luctus quis leo.</small>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <button className="btn btn-secondary" type="button">
                                                                <strong>Revoke</strong>
                                                            </button>
                                                        </div>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </div>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    {/* </div> */}
                </ContentWrapper>

            </div>
        )
    }
}

export default ViewConsultant;