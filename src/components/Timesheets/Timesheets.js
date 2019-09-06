import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, FormGroup, Input, Card, CardBody, Button } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { AvForm, AvInput } from 'availity-reactstrap-validation';

import * as projectActions from '../../store/actions/projectActions';
import * as timesheetActions from '../../store/actions/timesheet';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            divStyle: { minHeight: 100 },
            files: [],
            selectedOption: '',
            projects: [],
            buttonName :'',
            navigatedDate : moment()
        }
    }

    componentDidMount() {
        var dates = moment(new Date)
        this.setState({ 
            sun: dates.day(0).toDate().getDate(), date1 : dates.day(0).toDate(),
            mon: dates.day(1).toDate().getDate(), date2 : dates.day(1).toDate(),
            tue: dates.day(2).toDate().getDate(), date3 : dates.day(2).toDate(),
            wed: dates.day(3).toDate().getDate(), date4 : dates.day(3).toDate(),
            thur: dates.day(4).toDate().getDate(), date5 : dates.day(4).toDate(),
            fri: dates.day(5).toDate().getDate(), date6 : dates.day(5).toDate(),
            sat: dates.day(6).toDate().getDate(), date7 : dates.day(6).toDate(),
        })

        let userId = this.props.userData._id;
        this.props.getUserProjects(userId);

    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.userProjects !== this.props.userProjects) {
            let array = [];
            this.props.userProjects.map((projects, i) => {
                array.push({
                    label: projects.projectName + ` (${projects.clientId.label})`,
                    value: projects._id
                })
            })
            this.setState({ projects: array, selectedOption: array[0] })
        }
    }
    handleView = (view) => {

        if (view = "week" && view != "month") {
            this.setState({ divStyle: { minHeight: 100 } })
            document.getElementById("hide/show").style.display = "block"

        }
        else {
            // console.log("month", view)
            this.setState({ divStyle: { minHeight: 500 } })
            document.getElementById("hide/show").style.display = "none"

        }
    }
    onNavigate = (navigate, flipUnit, prevOrNext) => {

        var dates = moment(navigate)
        this.setState({ 
            sun: dates.day(0).toDate().getDate(), date1 : dates.day(0).toDate(),
            mon: dates.day(1).toDate().getDate(), date2 : dates.day(1).toDate(),
            tue: dates.day(2).toDate().getDate(), date3 : dates.day(2).toDate(),
            wed: dates.day(3).toDate().getDate(), date4 : dates.day(3).toDate(),
            thur: dates.day(4).toDate().getDate(), date5 : dates.day(4).toDate(),
            fri: dates.day(5).toDate().getDate(), date6 : dates.day(5).toDate(),
            sat: dates.day(6).toDate().getDate(), date7 : dates.day(6).toDate(),
            navigatedDate : dates
        })

    }

    onDrop = files => this.setState({ files })


    createImageItem = (file, index) => (
        <Col md={3} key={index}>
            <img className="img-fluid mb-2" src={file.preview} alt="Item" />
        </Col>
    )

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption: selectedOption });
    }

    handleClick = (e) => {
        e.preventDefault();
        // console.log("value", e.target.value)
        this.setState({ buttonName: e.target.value })
    }

    handleSubmit = (e, values) => {
        e.preventDefault();
        
        let weekData = [ 
            { date : this.state.date1, hours : values.input1 },
            { date : this.state.date2, hours : values.input2 },
            { date : this.state.date3, hours : values.input3 },
            { date : this.state.date4, hours : values.input4 },
            { date : this.state.date5, hours : values.input5 },
            { date : this.state.date6, hours : values.input6 },
            { date : this.state.date7, hours : values.input7 },
        ]

        let submitData = {
            type : this.state.buttonName,
            userId : this.props.userData,
            weekData : weekData,
            projectId : this.state.selectedOption,
        }
        this.props.addTimesheets(submitData);
    }
    render() {
        let allFiles = this.state.files;

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Timesheet
                      {/* <small>React gcal/outlook like calendar component</small> */}
                        </div>
                    </div>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/userdashboard">Dashboard</Link></li>
                        <li class="breadcrumb-item active">Timesheet</li>
                    </ol>
                    { /* START row */}
                    <div className="calendar-app">
                        { /* START panel */}
                        <Card className="card-default">
                            <CardBody>
                                <AvForm onValidSubmit = {this.handleSubmit}>
                                    <div className="row">
                                        <FormGroup className="col-lg-6">
                                            <label className="form-control-label" htmlFor="input-Sun">Project</label>
                                            <Select
                                                name="projectUser"
                                                placeholder="Select project"
                                                value={this.state.selectedOption}
                                                onChange={this.handleChangeSelect}
                                                options={this.state.projects}
                                            />
                                        </FormGroup>
                                    </div>
                                    <BigCalendar style={this.state.divStyle}
                                        defaultView='week'
                                        localizer={localizer}
                                        views={["month", "week"]}
                                        events={
                                            [{
                                                "title": "ashok",
                                                "allDay": false,
                                                "start": moment(),
                                                "end": new Date(2019, 0, 1, 10, 0)
                                            }]
                                        }
                                        startAccessor="start"
                                        endAccessor="end"
                                        defaultDate={new Date()}
                                        onView={this.handleView}
                                        onNavigate={(date, flipUnit, prevOrNext) => this.onNavigate(date, flipUnit, prevOrNext)}
                                    />

                                    <div id="hide/show">
                                        <Row>
                                            {/* <FormGroup className="col-lg-2"></FormGroup> */}
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Sun">{this.state.sun} - Sun</label>
                                                <AvInput className="form-control" defaultValue="0" name="input1" placeholder="Enter Time" type="number" min={0} disabled/>
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Mon">{this.state.mon} - Mon</label>
                                                <AvInput className="form-control" defaultValue="0" name="input2" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup >&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Tue">{this.state.tue} - Tue</label>
                                                <AvInput className="form-control" defaultValue="0" name="input3" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Wes">{this.state.wed} - Wed </label>
                                                <AvInput className="form-control" defaultValue="0" name="input4" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Thur">{this.state.thur} - Thu</label>
                                                <AvInput className="form-control" defaultValue="0" name="input5" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Fri"> {this.state.fri} - Fri </label>
                                                <AvInput className="form-control" defaultValue="0" name="input6" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Sat"> {this.state.sat} - Sat </label>
                                                <AvInput className="form-control" defaultValue="0" name="input7" placeholder="Enter Time" type="number" min={0} disabled/>
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label total-hours" htmlFor="input-Total">Total Hours</label>
                                                <AvInput className="form-control" defaultValue="0" name="input8" placeholder="Enter Time" type="number" min={0} disabled />
                                            </FormGroup>
                                            {/* <FormGroup className="col-lg-2"></FormGroup> */}
                                        </Row>
                                        <div className="row">
                                            <div className="form-group col-lg-12">
                                                <Dropzone className="card p-3" ref="dropzone" onDrop={this.onDrop} >
                                                    <div className="text-center box-placeholder m-0">Try dropping some files here, or click to select files to upload.</div>
                                                    <div className="mt-3">
                                                        {this.state.files.length > 0 ?
                                                            <Row>{allFiles.map(this.createImageItem)}</Row>
                                                            :
                                                            <div><small></small></div>
                                                        }
                                                    </div>
                                                </Dropzone>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-12">
                                                <label class="">Description:</label>
                                                <textarea class="form-control" cols="5" placeholder="Short description.." spellcheck="false"></textarea></div>
                                        </div>
                                        <div style={{ float: "right" }}>
                                            <Button type="submit" color="primary" id="savedata" value="save" onClick = {this.handleClick}>Save</Button>&nbsp;
                                            <Button type="submit" color="success" id="submitdata" value="submit" onClick = {this.handleClick}>Submit</Button>
                                        </div>
                                    </div>
                                </AvForm>

                            </CardBody>
                        </Card>
                        { /* END panel */}
                    </div>
                </ContentWrapper>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userData: state.user.userLogin.userData,
        userProjects: state.projects.userProjects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserProjects: (event) => dispatch(projectActions.getUserProjects(event)),
        addTimesheets : (event) => dispatch(timesheetActions.updateTimesheets(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

