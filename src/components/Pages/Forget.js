import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';

import FormValidator from '../Forms/FormValidator.js';
import * as userActions from '../../store/actions/userActions';


class Forget extends Component {

    constructor (props) {
        super (props);
        this.state = {
            userMsg: "",
            userRole : "",
            redirectCondition: false,
            formLogin: {
                email: ''            }
        }
    }
     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */
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

    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });
        e.preventDefault()
        if(!hasError) {
            console.log("state", this.state.formLogin.email)
            this.props.userForgetPassword({email : this.state.formLogin.email})
        }
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }
    componentDidUpdate(prevProps) {
        if(prevProps.forgetData !== this.props.forgetData){
               this.setState({userMsg : this.props.forgetData.msg})
    }
}
    render() {
      
        return (
            <div className="block-center mt-4 wd-xl ">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                        <img className="img-fluid" src="img/project.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">FORGET PASSWORD.</p>
                        <p className="text-center py-2 text-danger">{this.state.userMsg}</p>
                        <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        className="border-right-0"
                                        placeholder="Enter email"
                                        invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={this.state.formLogin.email}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>
                                    { this.hasError('formLogin','email','required') && <span className="invalid-feedback">Field is required</span> }
                                    { this.hasError('formLogin','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                </div>
                            </div>                           
                            <div className="clearfix">
                                
                                <div className="float-right">
                                    <Link to="login" className="text-muted">Login?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-info mt-3" type="submit">Submit</button>
                        </form>
                        {/* <p className="pt-3 text-center">Need to Signup?</p>
                        <Link to="register" className="btn btn-block btn-secondary">Register Now</Link> */}
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2019</span>
                    <span className="mx-2">-</span>
                    <span>My Reporting</span>
                    <br/>
                    {/* <span>Bootstrap Admin Template</span> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       forgetData : state.user.forgetPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userForgetPassword: (event) => dispatch(userActions.userForgetPassword(event)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forget);

