import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props} />;

const DashboardV1 = lazy(() => import('./components/Dashboard/DashboardV1'));
const DashboardV2 = lazy(() => import('./components/Dashboard/DashboardV2'));
const DashboardV3 = lazy(() => import('./components/Dashboard/DashboardV3'));
const userDashboard = lazy(() => import("./components/Dashboard/userDashbord"));
const Widgets = lazy(() => import('./components/Widgets/Widgets'));

const AddOrganization = lazy(() => import('./components/Organizations/AddOrganization'));
const ManageOrganizations = lazy(() => import('./components/Organizations/ManageOrganization'));
const ViewOrganization = lazy(() => import('./components/Organizations/ViewOrganization'));

const AddVendor = lazy(() => import('./components/Vendors/AddVendor'));
const ManageVendors = lazy(() => import('./components/Vendors/ManageVendors'));

const AddClient = lazy(() => import('./components/Clients/AddClient'));
const ManageClients = lazy(() => import('./components/Clients/ManageClients'));

const AddProject = lazy(() => import('./components/Projects/AddProject'));
const ManageProjects = lazy(() => import('./components/Projects/ManageProject'));

const ManageConsultant = lazy(() => import('./components/Consultants/ManageConsultant'));
const ViewConsultant = lazy(() => import('./components/Consultants/ViewConsultant'));

const Timesheets = lazy(() => import('./components/Timesheets/Timesheets'));
const Settings = lazy(() => import('./components/settings/settings'));
const AdminTimesheet = lazy(() => import('./components/Timesheets/AdminTimesheet'));


const Login = lazy(() => import('./components/Pages/Login'));
const Register = lazy(() => import('./components/Pages/Register'));
const Recover = lazy(() => import('./components/Pages/Recover'));
const Lock = lazy(() => import('./components/Pages/Lock'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const Error500 = lazy(() => import('./components/Pages/Error500'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance'));
const Forget = lazy(() => import("./components/Pages/Forget"));
const Reset = lazy(() => import("./components/Pages/Reset"));


// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance',
    '/forget',
    '/reset'
];

const Routes = ({ location }) => {

    const isLoggedIn = sessionStorage.getItem('loggedIn')

    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)} />
                        <Route path="/register" component={waitFor(Register)} />
                        <Route path="/recover" component={waitFor(Recover)} />
                        <Route path="/lock" component={waitFor(Lock)} />
                        <Route path="/notfound" component={waitFor(NotFound)} />
                        <Route path="/error500" component={waitFor(Error500)} />
                        <Route path="/maintenance" component={waitFor(Maintenance)} />
                        <Route path="/forget" component={waitFor(Forget)} /> 
                        <Route path="/reset" component={waitFor(Reset)} />
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        if (isLoggedIn) {
            return (
                // Layout component wrapper
                // Use <BaseHorizontal> to change layout
                <Base>
                    <TransitionGroup>
                        <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                            <div>
                                <Suspense fallback={<PageLoader />}>
                                    <Switch location={location}>

                                        {/*Dashboard*/}
                                        <Route path="/admindashboard" component={waitFor(DashboardV1)} />
                                        <Route path="/dashboard" component={waitFor(DashboardV2)} />
                                        <Route path="/dashboardv3" component={waitFor(DashboardV3)} />
                                        <Route path="/userdashboard" component={waitFor(userDashboard)} />

                                        {/*Widgets*/}
                                        <Route path="/widgets" component={waitFor(Widgets)} />

                                        {/* Organizations */}
                                        <Route path="/addOrganization" component={waitFor(AddOrganization)}/>
                                        <Route path="/manageOrganizations" component={waitFor(ManageOrganizations)}/>
                                        <Route path="/viewOrganization" component={waitFor(ViewOrganization)}/>

                                        {/* Vendors */}
                                        <Route path="/addVendor" component={waitFor(AddVendor)} />
                                        <Route path="/manageVendor" component={waitFor(ManageVendors)} />

                                        {/* Clients */}
                                        <Route path="/addClient" component={waitFor(AddClient)} />
                                        <Route path="/manageClients" component={waitFor(ManageClients)} />

                                        {/* Projects */}
                                        <Route path="/addProject" component={waitFor(AddProject)} />
                                        <Route path="/manageProjects" component={waitFor(ManageProjects)} />

                                        {/* Consultants */}
                                        <Route path="/manageUsers" component={waitFor(ManageConsultant)} />
                                        <Route path="/viewUser" component={waitFor(ViewConsultant)} />

                                        {/* Timesheets */}
                                        <Route path="/timesheets" component={waitFor(Timesheets)} />
                                        <Route path="/settings" component={waitFor(Settings)} />
                                        <Route path="/userTimesheets" component={waitFor(AdminTimesheet)} />

                                        <Redirect to="/login" />
                                    </Switch>
                                </Suspense>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Base>
            )
        }
        else {
            return <Redirect to="/login" />
        }
     
    }
}

export default withRouter(Routes);