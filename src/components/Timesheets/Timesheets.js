import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, FormGroup, Input, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            uploads : [],
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
            counter: 0

        }
    }

    setEvents = (events, dates) => {
        let counter = 0;

        for (var k = 0; k < events.length; k++) {
            let eventsDates = moment(new Date(events[k].start)).format("MM-DD-YY");

            if (eventsDates === moment(dates.day(0).toDate()).format("MM-DD-YY")) {
                document.getElementById("input1").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(1).toDate()).format("MM-DD-YY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value1: events[k].title })
                document.getElementById("input2").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(2).toDate()).format("MM-DD-YY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value2: events[k].title })
                document.getElementById("input3").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(3).toDate()).format("MM-DD-YY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value3: events[k].title })
                document.getElementById("input4").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(4).toDate()).format("MM-DD-YY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value4: events[k].title })
                document.getElementById("input5").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(5).toDate()).format("MM-DD-YY")) {
                counter = counter + events[k].title || 0;
                this.setState({ value5: events[k].title })
                document.getElementById("input6").disabled = events[k].lock;
            }
            if (eventsDates === moment(dates.day(6).toDate()).format("MM-DD-YY")) {
                document.getElementById("input7").disabled = events[k].lock;
            }
        }
        // let totalHours = mon + tue + wed + thur + fri
        this.setState({ counter: counter })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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

            if (this.props.events !== undefined) {

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
            this.setEvents(this.state.events, dates)
        }
        else {
            this.setState({ divStyle: { minHeight: 500 }, defaultView: "month" })
            document.getElementById("hide/show").style.display = "none"

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
            document.getElementById("input1").disabled = false;
            document.getElementById("input2").disabled = false;
            document.getElementById("input3").disabled = false;
            document.getElementById("input4").disabled = false;
            document.getElementById("input5").disabled = false;
            document.getElementById("input6").disabled = false;
            document.getElementById("input7").disabled = false;

            this.setEvents(this.state.events, dates);

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
            userId: this.props.userData,
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
        formdata.append("userData", JSON.stringify(this.props.userData))
        formdata.append("weekNo", moment(this.state.navigatedDate).week())
        formdata.append("month", moment(this.state.navigatedDate).month()+1)
        formdata.append("year", moment(this.state.navigatedDate).year())
        formdata.append("projectId", this.state.selectedOption.value)


        this.props.uploadDocs(formdata, this.state.selectedType, this.state.navigatedDate)
        this.setState({ modal : !this.state.modal })
    }

    handleClick = () => {

        let counter = 0;
        let weekData = [
            { date: this.state.date1, title: document.getElementById("input1").value },
            { date: this.state.date2, title: document.getElementById("input2").value },
            { date: this.state.date3, title: document.getElementById("input3").value },
            { date: this.state.date4, title: document.getElementById("input4").value },
            { date: this.state.date5, title: document.getElementById("input5").value },
            { date: this.state.date6, title: document.getElementById("input6").value },
            { date: this.state.date7, title: document.getElementById("input7").value },
        ]
        for (let data of weekData) {
            if (data.title) {
                counter += 1;
            }
        }
        if (counter === 7) {
            swal({
                text: "Are you sure to submit timesheet data ?",
                icon: "success",
                button: "Ok",
            })
                .then(value => {
                    let submitData = {
                        type: "submit",
                        userId: this.props.userData,
                        weekData: weekData,
                        projectId: this.state.selectedOption,
                        weekNo: moment(this.state.date1).week()
                    }
                    this.props.addTimesheets(submitData);
                })
        }
        else {
            swal({
                text: "Timesheet data missing for submission",
                icon: "warning",
                button: "Ok",
            })
        }
    }

    render() {

        const options = [
            { label: "Client", value: "Client" },
            { label: "Vendor", value: "Vendor" }
        ]
        let allFiles = this.state.files;
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
                                <BigCalendar
                                    style={this.state.divStyle}
                                    defaultView={this.state.defaultView}
                                    localizer={localizer}
                                    views={["month", "week"]}
                                    events={this.state.events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    defaultDate={new Date()}
                                    date={this.state.projectDate}
                                    onView={this.handleView}
                                    onNavigate={(date, flipUnit, prevOrNext) => this.onNavigate(date, flipUnit, prevOrNext)}
                                />
                                <AvForm onValidSubmit={this.handleSubmit}>
                                    <div id="hide/show">
                                        <Row>
                                            <Col lg="4">
                                                <br />
                                                <div className="row" style={{ paddingTop: "5px" }}>
                                                    <FormGroup className="col-lg-12">
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

                                                <div className="row">
                                                    <div className="form-group col-lg-12">
                                                        <label className="form-control-label" htmlFor="input-Sun">Upload Documents</label><br />
                                                        <Button type="button" color="info" value="Upload Documents" onClick={this.toggle}>Upload</Button>&nbsp;
                                                    </div>
                                                    <ol>
                                                        {this.state.uploads.map((upload, i) => {
                                                            let weekNo = moment(this.state.navigatedDate).week();
                                                            let yearNo = moment(this.state.navigatedDate).year()
                                                            if (weekNo === parseInt(upload.weekNo) && yearNo === parseInt(upload.year)) {
                                                                return (
                                                                    <>
                                                                        {upload.files.map((file, k) => {
                                                                            return (
                                                                                <li key={k}>{file.filename}</li>
                                                                            )
                                                                        })}
                                                                    </>
                                                                )
                                                            }
                                                        })}
                                                    </ol>
                                                </div>

                                            </Col>

                                            <Col lg="8">
                                                <Row>
                                                    <Col>
                                                        <FormGroup className="text-center">
                                                            <div className="px-2 badge badge-success text-center">{this.state.sun}</div><br />
                                                            <label className="form-control-label" htmlFor="input-Sun">Sun</label>
                                                            <AvInput className="form-control text-center" name="input1" id="input1" placeholder="Time" type="number" min={0} value="0" disabled />
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
                                                            <AvInput className="form-control text-center" name="input7" id="input7" placeholder="Time" type="number" min={0} value="0" disabled />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup className="text-center" style={{ paddingTop: "27px" }}>
                                                            <div className="px-2 badge badge-success text-center"></div>
                                                            <label className="form-control-label total-hours" htmlFor="input-Total">Total</label>
                                                            {/* <p>{this.state.counter}</p> */}
                                                            <Input className="form-control text-center" name="input8" placeholder="Time" type="text" value={this.state.counter} disabled />
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
                                                    <Button color="success" id="submitdata" value="submit" onClick={this.handleClick}>Submit</Button>
                                                </div>
                                            </Col>
                                        </Row>
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
        getTimesheets: (event) => dispatch(timesheetActions.getTimesheets(event)),
        uploadDocs: (event, type, navigatedDate) => dispatch(timesheetActions.uploadTimesheets(event, type, navigatedDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

