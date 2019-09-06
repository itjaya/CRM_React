import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';
import * as userActions from '../../store/actions/userActions';
import * as orgActions from '../../store/actions/orgActions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderRun from './Header.run'
import Auth from '../../helpers/Auth';

let handleAuth = new Auth();

class Header extends Component {

    state = {
        redirect : false,
        organizations: [],
        style : { display : "none"},
        orgName : ""
    }

    componentDidMount() {
        HeaderRun();
        let user = this.props.user.userLogin.userData;
        let orgs = user.organization
       
        if(user.role.value === "admin") {
            this.setState({ style : { visibility : "visible" } })
            this.setState({ organizations: orgs, orgName : orgs[0].value })
            this.props.onGetOrganizationByName(orgs[0].value)
        }
        
    }

    toggleUserblock = e => {
        e.preventDefault();
        this.props.actions.toggleSetting('showUserBlock');
    }

    toggleOffsidebar = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('offsidebarOpen');
    }

    toggleCollapsed = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('asideToggled');
    }

    resize () {
        // all IE friendly dispatchEvent
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        // modern dispatchEvent way
        // window.dispatchEvent(new Event('resize'));
    }

    handleLogout = (e) => {
        e.preventDefault();
        handleAuth.logout();
        this.props.onUserLogOut();
        this.setState({ redirect : true })
    }

    handleClick = (org, e) => {
        e.preventDefault();
        this.props.onGetOrganizationByName(org)
        this.setState({ orgName : org })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo" style = {{ color: "#fff"}}>
                                My Reporting
                                {/* <img className="img-fluid" src="img/logo.png" alt="App Logo" /> */}
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */ }

                    { /* START Left navbar */ }
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                            <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>
                                <em className="fas fa-bars"></em>
                            </a>
                            { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */ }
                            <a href=""  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>
                                <em className="fas fa-bars"></em>
                            </a>

                        </li>
                        { /* START User avatar toggle */ }
                        {/* <li className="nav-item d-none d-md-block">
                            <a  className="nav-link" onClick={ this.toggleUserblock }>
                                <em className="icon-user"></em>
                            </a>
                        </li> */}
                        { /* END User avatar toggle */ }
                        { /* START lock screen */ }
                        {/* <li className="nav-item d-none d-md-block">
                            <Link to="lock" title="Lock screen" className="nav-link">
                                <em className="icon-lock"></em>
                            </Link>
                        </li> */}
                        { /* END lock screen */ }
                    </ul>
                    { /* END Left navbar */ }
                    { /* START Right Navbar */ }
                    <div style = {{ color : "#fff"}}>{this.state.orgName}</div>

                    <ul className="navbar-nav flex-row">
                        { /* Toggle icon */ }
                        <UncontrolledDropdown nav inNavbar className="dropdown-list" style = {this.state.style}>
                            <DropdownToggle nav className="dropdown-toggle-nocaret">
                                <em className="fa fa-toggle-on"></em>
                                {/* <span className="badge badge-danger">11</span> */}
                            </DropdownToggle>
                            { /* START Dropdown menu */ }
                            <DropdownMenu right className="dropdown-menu-right animated">
                                <DropdownItem>
                                    { /* START list group */ }
                                    <ListGroup>
                                    {this.state.organizations.map((org, i) => {
                                          return (
                                            <ListGroupItem key = {i} action tag="a" href="" onClick={this.handleClick.bind(this, org.value)}>
                                               <div className="media">
                                                  <div className="align-self-start mr-2">
                                                     <em className="far fa-building text-info"></em>
                                                  </div>
                                                  <div className="media-body">
                                                     <p className="m-0">{org.value}</p>
                                                  </div>
                                               </div>
                                            </ListGroupItem>
                                          )  
                                    })}
                                         </ListGroup>

                                    { /* END list group */ }
                                </DropdownItem>
                            </DropdownMenu>
                            { /* END Dropdown menu */ }
                        </UncontrolledDropdown>
                        { /* Fullscreen (only desktops) */ }
                        <li className="nav-item d-none d-md-block">
                            <ToggleFullscreen className="nav-link"/>
                        </li>
                        { /* START Alert menu */ }
                        <UncontrolledDropdown nav inNavbar className="dropdown-list">
                            <DropdownToggle nav className="dropdown-toggle-nocaret">
                                <em className="fas fa-user-circle"></em>
                                {/* <span className="badge badge-danger">11</span> */}
                            </DropdownToggle>
                            { /* START Dropdown menu */ }
                            <DropdownMenu right className="dropdown-menu-right animated">
                                <DropdownItem>
                                    { /* START list group */ }
                                    <ListGroup>
                                       <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fas fa-user text-info"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">My Profile</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>
                                       <ListGroupItem action tag="a" href="" onClick={this.handleLogout}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fas fa-sign-out-alt text-warning"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">Logout</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>
                               
                                    </ListGroup>
                                    { /* END list group */ }
                                </DropdownItem>
                            </DropdownMenu>
                            { /* END Dropdown menu */ }
                        </UncontrolledDropdown>
                        { /* END Alert menu */ }
                        { /* START Offsidebar button */ }
                        {/* <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.toggleOffsidebar}>
                                <em className="icon-notebook"></em>
                            </a>
                        </li> */}
                        { /* END Offsidebar menu */ }
                    </ul>
                    { /* END Right Navbar */ }

                    { /* START Search form */ }
                    <form className="navbar-form" role="search" action="search.html">
                       <div className="form-group">
                          <input className="form-control" type="text" placeholder="Type and hit enter ..."/>
                          <div className="fa fa-times navbar-form-close" data-search-dismiss=""></div>
                       </div>
                       <button className="d-none" type="submit">Submit</button>
                    </form>
                    { /* END Search form */ }
                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }

}

Header.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => {   
    return { 
    settings: state.settings,
    user : state.user 
}}


const mapDispatchToProps = dispatch => (
    {   
        actions: bindActionCreators(actions, dispatch),
        onUserLogOut: (event) => dispatch(userActions.userLogOut(event)),
        onGetOrganizationByName : (event) => dispatch(orgActions.getOrganizationByName(event))
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);