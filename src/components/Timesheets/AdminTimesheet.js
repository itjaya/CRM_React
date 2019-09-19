import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, FormGroup, Input, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap';
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
import { url } from "../../urlConstants"

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "./timesheet.css"


BigCalendar.momentLocalizer(moment);


const localizer = BigCalendar.momentLocalizer(moment)

class AdminTimesheet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            divStyle: { minHeight: 50 },
            files: [],
            selectedOption: '',
            projects: [],
            days : [],
            events: [],
            uploads : [],
            monthEvents : [],
            projectDetails: {},
            buttonName: '',
            navigatedDate: moment(),
            defaultView: "week",
            projectDate: moment(),
            selectedType: "",
            modal: false,
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            counter: 0,
            monthCounter : 0

        }
    }

    setEvents = (events, dates) => {
        let counter = 0;
        let monthCounter = 0;
        let mon, tue, wed, thur, fri;
        var days1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var today = moment(dates).toDate()
        var startDate = moment([today.getFullYear(), today.getMonth()]);
        var date = moment(startDate).toDate();
        var daysInaMonth = dates.daysInMonth();

        var days = [];
        let monthEve = [];
        for (let i = 1; i <= daysInaMonth; i++) {
            // days.push(days1[date.getDay(i)] + " " + date.getDate());
            days.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }

        for (var k = 0; k < events.length; k++) {

            let eventsDates = moment(new Date(events[k].start)).format("M-DD-YYYY");
            let monthNo = moment(new Date(events[k].start)).toDate().getMonth()+1;
            let yearNo = moment(new Date(events[k].start)).toDate().getFullYear();

            if(monthNo === dates.toDate().getMonth()+1 && yearNo === dates.toDate().getFullYear()) {
                monthEve.push(moment(new Date(events[k].start)).toDate().getDate());
                monthCounter += events[k].title
            }
            if (eventsDates === moment(dates.day(1).toDate()).format("M-DD-YYYY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value1: events[k].title })
            }
            if (eventsDates === moment(dates.day(2).toDate()).format("M-DD-YYYY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value2: events[k].title })
            }
            if (eventsDates === moment(dates.day(3).toDate()).format("M-DD-YYYY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value3: events[k].title })
            }
            if (eventsDates === moment(dates.day(4).toDate()).format("M-DD-YYYY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value4: events[k].title })
            }
            if (eventsDates === moment(dates.day(5).toDate()).format("M-DD-YYYY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value5: events[k].title })
            }
        }
       
        this.setState({ counter: counter })
        // if (mon && tue && wed && thur && fri !== undefined) {
            // let totalHours = mon + tue + wed + thur + fri
            // this.setState({ counter: counter })
        // }
        // else {
        //     this.setState({ counter: 0 })
        // }
        this.setState({ days: days, monthEvents : monthEve, monthCounter: monthCounter })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {

        document.getElementById("monthView").style.display = "none";
        var dates = moment(new Date);
        this.setState({
            sun: dates.day(0).toDate().getDate(), date1: dates.day(0).toDate(),
            mon: dates.day(1).toDate().getDate(), date2: dates.day(1).toDate(),
            tue: dates.day(2).toDate().getDate(), date3: dates.day(2).toDate(),
            wed: dates.day(3).toDate().getDate(), date4: dates.day(3).toDate(),
            thur: dates.day(4).toDate().getDate(), date5: dates.day(4).toDate(),
            fri: dates.day(5).toDate().getDate(), date6: dates.day(5).toDate(),
            sat: dates.day(6).toDate().getDate(), date7: dates.day(6).toDate(),
        });

        let userId = this.props.user._id;
        this.props.getUserProjects(userId);
    }

    componentDidUpdate = async (prevProps) => {
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
                        isAllDay: obj.isAllDay,
                        lock: obj.lock
                    })
                }
                this.setState({ events: array, uploads : this.props.events.uploads, projectDetails: this.props.events, projectDate: moment(this.props.events.prjStartDate).toDate() })
                var dates = moment(new Date());
                await this.setEvents(array, dates);
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
            userId: this.props.user._id,
            project: this.state.selectedOption
        }
        this.props.getTimesheets(obj)
    }

    handleView = (view) => {

        if (view === "week") {
            this.setState({ divStyle: { minHeight: 50 }, defaultView: "week" })
            document.getElementById("hide/show").style.display = "block";
            document.getElementById("monthView").style.display = "none";

            let dates = moment(new Date());
            this.setEvents(this.state.events, dates)
        }
        else {
            document.getElementById("monthView").style.display = "block";
            // this.setState({ divStyle: { minHeight: 500 }, defaultView: "month" })
            document.getElementById("hide/show").style.display = "none";

        }
    }

    onNavigate = (navigate) => {

        var dates = moment(navigate);
        let projectDate = moment(new Date(this.props.events.prjStartDate))
        let monthStartDate = moment(projectDate).startOf('month')
        let range = dates.isSameOrAfter(monthStartDate)

        if (range) {

            this.setState({ value1: "", value2: "", value3: "", value4: "", value5: "", projectDate: dates.toDate() })
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
            this.setEvents(this.state.events, dates);
        }

    }

    onDrop = files => {
        this.state.files.push(...files)
        this.setState({ files: this.state.files })
    }

    createImageItem = (file, index) => (
        <Row key={index}>
            <Col lg="10">{file.name}</Col>
            <Col lg="2"> <i className="fa fa-times text-danger cursor" onClick={this.handleFileRemove.bind(this, index)}></i></Col>
        </Row>
    )

    handleFileRemove = i => {
        let values = [...this.state.files];
        values.splice(i, 1);
        this.setState({ files: values })
    }

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
            userId: this.props.user,
            weekData: weekData,
            projectId: this.state.selectedOption,
            weekNo: moment(this.state.date1).week()
        }
        // console.log("subm", submitData)
        this.props.addTimesheets(submitData);

    }

    handleSelectType = (selectedType) => {
        this.setState({ selectedType })
    }

    handleUpload = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        let files = this.state.files

        for (var i = 0; i < files.length; i++) {
            formdata.append("file", files[i])
        }
        formdata.append("type", JSON.stringify(this.state.selectedType))
        formdata.append("userData", JSON.stringify(this.props.user))
        formdata.append("weekNo", moment(this.state.navigatedDate).week())
        formdata.append("month", moment(this.state.navigatedDate).month()+1)
        formdata.append("year", moment(this.state.navigatedDate).year())

        this.props.uploadDocs(formdata, this.state.selectedType, this.state.navigatedDate);
        this.setState({ modal : !this.state.modal })
    }

    handleDownload = (upload) =>{
        // console.log("data", url)
        // this.props.downloadDocs(upload)
        window.location = url + "downloadtimesheet?data=" + upload.path + "&filename=" + upload.filename + ""

    }
    render() {
        const options = [
            { label: "Client", value: "Client" },
            { label: "Vendor", value: "Vendor" }
        ]
        let allFiles = this.state.files;
        return (
            <div>
                <Container className="mt--7" fluid>
                    <div className="calendar-app">
                        { /* START panel */}
                        <Card >
                            <CardBody>
                                <BigCalendar
                                    style={this.state.divStyle}
                                    defaultView={this.state.defaultView}
                                    localizer={localizer}
                                    views={["month", "week"]}
                                    events={
                                        [{
                                            "title": "ashok",
                                            "allDay": false,
                                            "start": new Date(2018, 0, 1, 10, 0),
                                            "end": new Date(2018, 0, 1, 10, 0)
                                        }]
                                    }
                                    // events={this.state.events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    defaultDate={new Date()}
                                    date={this.state.projectDate}
                                    onView={this.handleView}
                                    onNavigate={(date, flipUnit, prevOrNext) => this.onNavigate(date, flipUnit, prevOrNext)}
                                />

                                <div className="" style={{ paddingTop: "5px", width: "30%" }}>
                                    <FormGroup >
                                        <label className="form-control-label" htmlFor="input-Sun">Select Project</label>
                                        <Select
                                            name="projectUser"
                                            placeholder="Select project"
                                            value={this.state.selectedOption}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.projects}
                                        />
                                    </FormGroup>
                                </div>

                                <div id="monthView">
                                    <Table responsive className="table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th className="text-center text-info"> Date</th>
                                                {this.state.days.map((data, i) => {
                                                    return (
                                                        <th key = {i} className="text-center text-info">{data}</th>
                                                    )
                                                })}
                                                <th className="text-center text-info">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">Time (Hrs)</td>
                                                {
                                                    this.state.days.map((day, k) => {
                                                        if (this.state.monthEvents.includes(day)) {
                                                            for (let i = 0; i < this.state.events.length; i++) {
                                                                if (moment(this.state.events[i].start).toDate().getMonth() + 1 === moment(this.state.navigatedDate).toDate().getMonth() + 1
                                                                    && moment(this.state.events[i].start).toDate().getDate() === day && moment(this.state.events[i].start).toDate().getFullYear() === moment(this.state.navigatedDate).year()) {
                                                                    return <td key={k} className="text-center">{this.state.events[i].title}</td>
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            return <td key={k} className="text-center">-</td>
                                                        }
                                                    })
                                                }
                                                <td className="text-center">{this.state.monthCounter}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                                
                                    <br />
                                    <div>
                                        <label className="form-control-label" htmlFor="input-Sun">Uploaded Documents</label>
                                        <ol>
                                            {this.state.uploads.map((upload, i) => {
                                                let monthNo = moment(this.state.navigatedDate).month()+1;
                                                let yearNo = moment(this.state.navigatedDate).year()
                                                if(parseInt(upload.month) === monthNo && yearNo === parseInt(upload.year)) {
                                                    return (
                                                        upload.files.map(file => {
                                                            return (
                                                                <li key={i}>{file.filename} &nbsp;<i className="fas fa-download text-success cursor" onClick={this.handleDownload.bind(this, file)}></i></li>
                                                            )

                                                        })
                                                    )
                                                }
                                               
                                            })}
                                        </ol>
                                    </div>
                                </div>

                                <AvForm onValidSubmit={this.handleSubmit}>
                                    <div id="hide/show">


                                        <Row>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.sun}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Sun">Sun</label>
                                                    <AvInput className="form-control text-center" name="input1" id="input1" placeholder="Time" type="number" min={0} value="0" />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.mon}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Mon">Mon</label>
                                                    <AvInput className="form-control text-center" name="input2" id="input2" placeholder="Time" type="number" min={0} value={this.state.value1} />
                                                </FormGroup >
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.tue}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Tue">Tue</label>
                                                    <AvInput className="form-control text-center" name="input3" id="input3" placeholder="Time" type="number" min={0} value={this.state.value2} />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.wed}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Wes">Wed </label>
                                                    <AvInput className="form-control text-center" name="input4" id="input4" placeholder="Time" type="number" min={0} value={this.state.value3} />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.thur}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Thur">Thu</label>
                                                    <AvInput className="form-control text-center" name="input5" id="input5" placeholder="Time" type="number" min={0} value={this.state.value4} />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.fri}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Fri"> Fri </label>
                                                    <AvInput className="form-control text-center" name="input6" id="input6" placeholder="Time" type="number" min={0} value={this.state.value5} />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center">
                                                    <div className="px-2 badge badge-success text-center">{this.state.sat}</div><br />
                                                    <label className="form-control-label" htmlFor="input-Sat">Sat </label>
                                                    <AvInput className="form-control text-center" name="input7" id="input7" placeholder="Time" type="number" min={0} value="0"  />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup className="text-center" style={{ paddingTop: "27px" }}>
                                                    <div className="px-2 badge badge-success text-center"></div>
                                                    <label className="form-control-label total-hours" htmlFor="input-Total">Total</label>
                                                    {/* <p>{this.state.counter}</p> */}
                                                    <Input className="form-control text-center" name="input8" placeholder="Time" type="text" value={this.state.counter} readOnly/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="row">
                                            <div className="form-group col-lg-12">
                                                <label className="">Description:</label>
                                                <textarea className="form-control" cols="5" placeholder="Short description.." spellCheck="false"></textarea></div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-lg-12">
                                                <label className="form-control-label" htmlFor="input-Sun">Upload Documents</label><br />
                                                <Button type="button" color="info" value="Upload Documents" onClick={this.toggle}>Upload</Button>&nbsp;
                                                    </div>
                                        </div>

                                        <div style={{ float: "right" }}>
                                            <Button type="submit" color="primary" id="savedata" value="save">Save</Button>&nbsp;
                                                    {/* <Button color="success" id="submitdata" value="submit" onClick={this.handleClick}>Submit</Button> */}
                                        </div>

                                    </div>
                                </AvForm>

                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Upload Documents</ModalHeader>
                                    <ModalBody>
                                        <form encType="multipart/form-data">
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup className="col-lg-12">
                                                        <label className="form-control-label" htmlFor="input-Sun">Select Project</label>
                                                        <Select
                                                            name="fileType"
                                                            placeholder="Select type"
                                                            value={this.state.selectedType}
                                                            onChange={this.handleSelectType}
                                                            options={options}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <Dropzone className="card" ref="dropzone" onDrop={this.onDrop} multiple >
                                                        <div className="text-center box-placeholder m-0">Try dropping some files here, or click to select files to upload.</div>
                                                    </Dropzone>
                                                    <div className="mt-3">
                                                        {this.state.files.length > 0 ?

                                                            allFiles.map(this.createImageItem)
                                                            :
                                                            <div><small></small></div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.handleUpload}>Ok</Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>

                            </CardBody>
                        </Card>
                        { /* END panel */}
                    </div>
                </Container>
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
        getTimesheets: (event) => dispatch(timesheetActions.getTimesheets(event)),
        uploadDocs: (event, type, navigatedDate) => dispatch(timesheetActions.uploadTimesheets(event, type, navigatedDate)),
        downloadDocs : (event) => dispatch(timesheetActions.downloadTimesheets(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTimesheet);

