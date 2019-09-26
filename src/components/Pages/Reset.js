import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input,Col } from 'reactstrap';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import FormValidator from '../Forms/FormValidator.js';
import * as userActions from '../../store/actions/userActions';


class Reset extends Component {

    constructor (props) {
        super (props);
        this.state = {
            userMsg: "",
            email : "",
            condition: false,
            userForm: {
                password2: '',
                password: ''
            }
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

    componentDidMount(){
        let email = this.props.location.search;
        email = email.slice(1, email.length-0);
        this.setState({email : email});
    }
    onSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });
        // console.log(hasError ? 'Form has e/rrors. Check!' : 'Form Submitted!')
        e.preventDefault()
        if(!hasError) {
            // console.log("state", this.state)
            let data = {
                type : "reset",
                email : this.state.email,
                password : this.state.userForm.password
            }
            // console.log("data", data)
            this.props.userPasswordUpdate(data)
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
        if(prevProps.userPassword !== this.props.userPassword){
            if(this.props.userPassword.condition){
                swal({
                    text: this.props.userPassword.msg,
                    icon: "success",
                    // buttons: true,
                })
                .then((password) => {
                 this.setState({ condition : true})
                }) 
            }
            else{
                this.setState({ passwordMsg : this.props.userPassword.msg})
            }
        }
    }

    render() {
      if(this.state.condition) {
        
            return <Redirect to = {{ pathname :"/login" }}/>
      }
        return (
            <div className="block-center mt-4 wd-xl ">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center rounded" src="img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">ResetPassword</p>
                        <form className="mb-3" name="userForm" onSubmit={this.onSubmit}>
                        <div className="form-group row align-items-center">
                                        {/* <label className="col-md-4 col-form-label">Password</label> */}
                                        <Col lg={12}>
                                            <Input type="password"
                                                id="id-password"
                                                name="password"
                                                invalid={this.hasError('userForm', 'password', 'required')}
                                                onChange={this.validateOnChange}
                                                data-validate='["required"]'
                                                placeholder="Enter Password"
                                                value={this.state.userForm.password}
                                                className = "required"
                                                />
                                            <span className="invalid-feedback">Field is required</span>

                                        </Col>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        {/* <label className="col-md-4 col-form-label">Confirm Password</label> */}
                                        <Col lg={12}>
                                            <Input type="password"
                                                name="password2"
                                                invalid={this.hasError('userForm', 'password2', 'equalto')}
                                                onChange={this.validateOnChange}
                                                data-validate='["equalto"]'
                                                placeholder="Confirm Password"
                                                value={this.state.userForm.password2}
                                                data-param="id-password"
                                                className = "required"
                                            />
                                            <span className="invalid-feedback">Field must be equal to previous</span>
                                        </Col>
                                    </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox float-left mt-0">
                                    <label>
                                        <input type="checkbox" value="" name="remember"/>
                                        <span className="fa fa-check"></span>Remember Me</label>
                                </div>
                                <div className="float-right">
                                    <Link to="recover" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
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
        userPassword : state.user.userPassword
    }
}
const mapDispatchToProps = dispatch => {
    return {
       
        userPasswordUpdate: (event) => dispatch(userActions.userUpdatePassword(event)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);