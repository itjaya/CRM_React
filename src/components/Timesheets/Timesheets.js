import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, FormGroup, Input, Card, CardBody, Button } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import swal from 'sweetalert';

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
            events: [],
            projectDetails: {},
            buttonName: '',
            navigatedDate: moment(),
            defaultView: "week",
            projectDate : moment(),
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",

        }
    }


    componentDidMount() {
        var dates = moment(new Date);

        this.setState({
            sun: dates.day(0).toDate().getDate(), date1: dates.day(0).toDate(),
            mon: dates.day(1).toDate().getDate(), date2: dates.day(1).toDate(),
            tue: dates.day(2).toDate().getDate(), date3: dates.day(2).toDate(),
            wed: dates.day(3).toDate().getDate(), date4: dates.day(3).toDate(),
            thur: dates.day(4).toDate().getDate(), date5: dates.day(4).toDate(),
            fri: dates.day(5).toDate().getDate(), date6: dates.day(5).toDate(),
            sat: dates.day(6).toDate().getDate(), date7: dates.day(6).toDate(),
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
            this.setState({ projects: array });
            this.handleChangeSelect(array[0]);
        }
        if (prevProps.events !== this.props.events) {

            if (this.props.events.events !== undefined) {
                let array = [];
                let eventsArray = this.props.events.events;
                for (let obj of eventsArray) {
                    array.push({
                        start: moment(obj.start).toDate(),
                        end: moment(obj.end).toDate(),
                        title: obj.title,
                        isAllDay: obj.isAllDay
                    })
                }
                this.setState({ events: array, projectDetails: this.props.events, projectDate : moment(this.props.events.prjStartDate).toDate() })
                var dates = moment(new Date());
                let events = array;
                for (var k = 0; k < events.length; k++) {
                    let eventsDates = moment(new Date(events[k].start)).format("MM-DD-YY");

                    if (eventsDates === moment(new Date(dates.day(1).toDate())).format("MM-DD-YY")) {
                        this.setState({ value1: events[k].title })
                    }
                    if (eventsDates === moment(new Date(dates.day(2).toDate())).format("MM-DD-YY")) {
                        this.setState({ value2: events[k].title })
                    }
                    if (eventsDates === moment(new Date(dates.day(3).toDate())).format("MM-DD-YY")) {
                        this.setState({ value3: events[k].title })
                    }
                    if (eventsDates === moment(new Date(dates.day(4).toDate())).format("MM-DD-YY")) {
                        this.setState({ value4: events[k].title })
                    }
                    if (eventsDates === moment(new Date(dates.day(5).toDate())).format("MM-DD-YY")) {
                        this.setState({ value5: events[k].title })
                    }
                }
            }
        }
        if (prevProps.timesheets !== this.props.timesheets) {
            swal({
                text: this.props.timesheets.msg,
                icon: "success",
                button: "Ok",
            })
                .then(value => {
                    setTimeout(() => {
                        this.refreshData();
                    }, 1000);
                })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        await this.setState({ selectedOption: selectedOption });
        this.refreshData();
    }

    refreshData = () => {

        let obj = {
            userId: this.props.userData._id,
            project: this.state.selectedOption
        }
        this.props.getTimesheets(obj)
    }

    handleView = (view) => {

        if (view === "week") {
            this.setState({ divStyle: { minHeight: 100 }, defaultView: "week" })
            document.getElementById("hide/show").style.display = "block";
            let dates = moment(new Date());

            let events = this.state.events
            for (var k = 0; k < events.length; k++) {
                let eventsDates = moment(new Date(events[k].start)).format("MM-DD-YY");

                if (eventsDates === moment(new Date(dates.day(1).toDate())).format("MM-DD-YY")) {
                    this.setState({ value1: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(2).toDate())).format("MM-DD-YY")) {
                    this.setState({ value2: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(3).toDate())).format("MM-DD-YY")) {
                    this.setState({ value3: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(4).toDate())).format("MM-DD-YY")) {
                    this.setState({ value4: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(5).toDate())).format("MM-DD-YY")) {
                    this.setState({ value5: events[k].title })
                }
            }
        }
        else {
            this.setState({ divStyle: { minHeight: 500 }, defaultView: "month" })
            document.getElementById("hide/show").style.display = "none"

        }
    }

    onNavigate = (navigate, prevOrNext) => {

        var dates = moment(navigate);
        let projectDate = moment(new Date(this.props.events.prjStartDate))
        let monthStartDate = moment(projectDate).startOf('month')
        let range = dates.isSameOrAfter(monthStartDate)

        if (range) {

            this.setState({ value1: "", value2: "", value3: "", value4: "", value5: "", projectDate : dates.toDate() })
            let events = this.state.events
            let weekStartDate = moment().day(0);
            let weekEndDate = moment().day(6);
            this.setState({
                sun: dates.day(0).toDate().getDate(), date1: dates.day(0).toDate(),
                mon: dates.day(1).toDate().getDate(), date2: dates.day(1).toDate(),
                tue: dates.day(2).toDate().getDate(), date3: dates.day(2).toDate(),
                wed: dates.day(3).toDate().getDate(), date4: dates.day(3).toDate(),
                thur: dates.day(4).toDate().getDate(), date5: dates.day(4).toDate(),
                fri: dates.day(5).toDate().getDate(), date6: dates.day(5).toDate(),
                sat: dates.day(6).toDate().getDate(), date7: dates.day(6).toDate(),
                navigatedDate: dates
            });
            document.getElementById("input1").disabled = false;
            document.getElementById("input2").disabled = false;
            document.getElementById("input3").disabled = false;
            document.getElementById("input4").disabled = false;
            document.getElementById("input5").disabled = false;
            document.getElementById("input6").disabled = false;
            document.getElementById("input7").disabled = false;

            for (var k = 0; k < events.length; k++) {
                let eventsDates = moment(new Date(events[k].start)).format("MM-DD-YY");

                if (eventsDates === moment(new Date(dates.day(1).toDate())).format("MM-DD-YY")) {
                    this.setState({ value1: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(2).toDate())).format("MM-DD-YY")) {
                    this.setState({ value2: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(3).toDate())).format("MM-DD-YY")) {
                    this.setState({ value3: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(4).toDate())).format("MM-DD-YY")) {
                    this.setState({ value4: events[k].title })
                }
                if (eventsDates === moment(new Date(dates.day(5).toDate())).format("MM-DD-YY")) {
                    this.setState({ value5: events[k].title })
                }
            }

            if (dates.isAfter(weekEndDate)) {
                document.getElementById("input1").disabled = true;
                document.getElementById("input2").disabled = true;
                document.getElementById("input3").disabled = true;
                document.getElementById("input4").disabled = true;
                document.getElementById("input5").disabled = true;
                document.getElementById("input6").disabled = true;
                document.getElementById("input7").disabled = true;
            }
        }

    }

    onDrop = files => this.setState({ files })


    createImageItem = (file, index) => (
        <Row md={3} key={index}>
            <span>{file.name}</span>
         </Row>
    )

    handleSubmit = (e, values) => {
        e.preventDefault();

        let weekData = [
            { date: this.state.date1, title: values.input1 },
            { date: this.state.date2, title: values.input2 },
            { date: this.state.date3, title: values.input3 },
            { date: this.state.date4, title: values.input4 },
            { date: this.state.date5, title: values.input5 },
            { date: this.state.date6, title: values.input6 },
            { date: this.state.date7, title: values.input7 },
        ]

        let submitData = {
            type: "save",
            userId: this.props.userData,
            weekData: weekData,
            projectId: this.state.selectedOption,
            weekNo: moment(this.state.date1).week()
        }
        // console.log("subm", submitData)
        this.props.addTimesheets(submitData);

    }

    render() {
        let allFiles = this.state.files;
        console.log("all", allFiles)
        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Timesheet
                      {/* <small>React gcal/outlook like calendar component</small> */}
                        </div>
                    </div>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/userdashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Timesheet</li>
                    </ol>
                    { /* START row */}
                    <div className="calendar-app">
                        { /* START panel */}
                        <Card className="card-default">
                            <CardBody>
                                <AvForm onValidSubmit={this.handleSubmit}>
                                    <BigCalendar 
                                        style={this.state.divStyle}
                                        defaultView={this.state.defaultView}
                                        localizer={localizer}
                                        views={["month", "week"]}
                                        events={this.state.events}
                                        startAccessor="start"
                                        endAccessor="end"
                                        defaultDate={new Date()}
                                        date = {this.state.projectDate}
                                        onView={this.handleView}
                                        onNavigate={(date, flipUnit, prevOrNext) => this.onNavigate(date, flipUnit, prevOrNext)}
                                    />

                                    <div id="hide/show">
                                        <Row>
                                            <Col lg="4">
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

                                                <div className="row">
                                                    <div className="form-group col-lg-12">
                                                        <Dropzone className="card p-3" ref="dropzone" onDrop={this.onDrop} multiple >
                                                            <div className="text-center box-placeholder m-0">Try dropping some files here, or click to select files to upload.</div>
                                                            <div className="mt-3">
                                                                {this.state.files.length > 0 ?

                                                                    allFiles.map(this.createImageItem)
                                                                    :
                                                                    <div><small></small></div>
                                                                }
                                                            </div>
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col lg="8">
                                                <Row>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                            <div className="px-2 badge badge-success text-center">{this.state.sun}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Sun">Sun</label>
                                                            <AvInput className="form-control" name="input1" id="input1" placeholder="Enter Time" type="number" min={0} disabled />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.mon}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Mon">Mon</label>
                                                            <AvInput className="form-control" name="input2" id="input2" placeholder="Enter Time" type="number" min={0} value={this.state.value1} />
                                                        </FormGroup >
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.tue}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Tue">Tue</label>
                                                            <AvInput className="form-control" name="input3" id="input3" placeholder="Enter Time" type="number" min={0} value={this.state.value2} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.wed}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Wes">Wed </label>
                                                            <AvInput className="form-control" name="input4" id="input4" placeholder="Enter Time" type="number" min={0} value={this.state.value3} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.thur}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Thur">Thu</label>
                                                            <AvInput className="form-control" name="input5" id="input5" placeholder="Enter Time" type="number" min={0} value={this.state.value4} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.fri}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Fri"> Fri </label>
                                                            <AvInput className="form-control" name="input6" id="input6" placeholder="Enter Time" type="number" min={0} value={this.state.value5} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center">{this.state.sat}</div><br/>
                                                            <label className="form-control-label" htmlFor="input-Sat">Sat </label>
                                                            <AvInput className="form-control" name="input7" id="input7" placeholder="Enter Time" type="number" min={0} disabled />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                        <div className="px-2 badge badge-success text-center"></div><br/>
                                                            <label className="form-control-label total-hours" htmlFor="input-Total">Total Hours</label>
                                                            <AvInput className="form-control" name="input8" placeholder="Enter Time" type="number" min={0} disabled />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <div className="row">
                                                    <div className="form-group col-lg-12">
                                                        <label className="">Description:</label>
                                                        <textarea className="form-control" cols="5" placeholder="Short description.." spellCheck="false"></textarea></div>
                                                </div>

                                                <div style={{ float: "right" }}>
                                                    <Button type="submit" color="primary" id="savedata" value="save" >Save</Button>&nbsp;
                                            <Button type="submit" color="success" id="submitdata" value="submit" onClick={this.handleClick}>Submit</Button>
                                                </div>
                                            </Col>
                                        </Row>
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
        userProjects: state.projects.userProjects,
        events: state.timesheets.allEvents,
        projectDetails: state.timesheets,
        timesheets: state.timesheets.timesheetResult
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserProjects: (event) => dispatch(projectActions.getUserProjects(event)),
        addTimesheets: (event) => dispatch(timesheetActions.updateTimesheets(event)),
        getTimesheets: (event) => dispatch(timesheetActions.getTimesheets(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

