import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


// required props for HOCs (withScriptjs and withGoogleMap)
const requiredProps = {
    googleMapURL: '//maps.google.com/maps/api/js?key=AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA', // &libraries=geometry,drawing,places
    loadingElement: <div className='gmap gmap-sm'>Loading...</div>,
    containerElement: <div className='gmap gmap-sm'/>,
    mapElement: <div style={{ height: `100%` }}/>
}

// Demo classic
const DemoMapClassic = compose(
  withProps(requiredProps),
  withScriptjs,
  withGoogleMap
)(props => (
    <GoogleMap defaultZoom={14} defaultCenter={props.location}>
        <Marker position={props.location} />
    </GoogleMap>
))

class Widgets extends Component {

    state = {
        // default location used for all demos
        location: { lat: 33.7906731, lng: -117.8357194 },
        activeTab: 'tasks'
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">Dashboard</div>
                {/* START row */}
                <Row>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fa fa-gamepad fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Projects</h3>
                                <p className="text-muted">Games played last month</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fa fa-coffee fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Vendors</h3>
                                <p className="text-muted">Coffee cups per day</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-green" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}>
                                        <span className="sr-only">80% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fa fa-upload fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Clients</h3>
                                <p className="text-muted">Average Monthly Uploads</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
                                        <span className="sr-only">40% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                    <div className="col-xl-3">
                        {/* START card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right text-muted">
                                    <em className="fa fa-gamepad fa-2x"></em>
                                </div>
                                <h3 className="mt-0">Users</h3>
                                <p className="text-muted">Games played last month</p>
                                <div className="progress progress-xs mb-3">
                                    <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="70" style={{width: '60%'}}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END card */}
                    </div>
                </Row>
                {/* END row */}
               
            </ContentWrapper>
        );
    }

}

export default Widgets;
