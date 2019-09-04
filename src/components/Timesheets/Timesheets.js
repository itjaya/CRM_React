import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, FormGroup, Input, Card, CardBody } from 'reactstrap';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import Dropzone from 'react-dropzone';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

BigCalendar.momentLocalizer(moment);

// const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment)

class Timesheets extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: [],
            divStyle: { minHeight: 500 },
            files: []
        }
    }

    componentDidMount() {
        document.getElementById("hide/show").style.display = "none"

    }

    handleView = (view) => {
        if (view === "week" && view !== "month") {

            var dates = moment(this.state.navigatedDate)
            this.setState({ sun: dates.day(0).toDate().getDate(), mon: dates.day(1).toDate().getDate(), tue: dates.day(2).toDate().getDate(), wed: dates.day(3).toDate().getDate(), thur: dates.day(4).toDate().getDate(), fri: dates.day(5).toDate().getDate(), sat: dates.day(6).toDate().getDate() })
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
        this.setState({ sun: dates.day(0).toDate().getDate(), mon: dates.day(1).toDate().getDate(), tue: dates.day(2).toDate().getDate(), wed: dates.day(3).toDate().getDate(), thur: dates.day(4).toDate().getDate(), fri: dates.day(5).toDate().getDate(), sat: dates.day(6).toDate().getDate() })

    }
    onDrop = files => this.setState({ files })

    createImageItem = (file, index) => (
        <Col md={3} key={index}>
            <img className="img-fluid mb-2" src={file.preview} alt="Item" />
        </Col>
    )
    render() {
        let allFiles = this.state.files;

        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Big Calendar
                      <small>React gcal/outlook like calendar component</small>
                        </div>
                    </div>
                    { /* START row */}
                    <div className="calendar-app">
                        { /* START panel */}
                        <Card className="card-default">
                            <CardBody>
                                <div className="row">
                                    <FormGroup className="col-lg-6">
                                        <label className="form-control-label" htmlFor="input-Sun">Project</label>
                                        <select className="custom-select">
                                            <option>Open this select menu</option>
                                            <option>One</option>
                                            <option>Two</option>
                                            <option>Three</option>
                                        </select>                                    
                                        </FormGroup>
                                    <FormGroup className="col-lg-6">
                                        <label className="form-control-label" htmlFor="input-Sun">Job Title</label>
                                        <select className="custom-select">
                                            <option>Open this select menu</option>
                                            <option>One</option>
                                            <option>Two</option>
                                            <option>Three</option>
                                        </select>
                                    </FormGroup>
                                </div>
                                <BigCalendar style={this.state.divStyle}
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
                                            <Input className="form-control" defaultValue="0" id="input- Sun" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Mon">{this.state.mon} - Mon</label>
                                            <Input className="form-control" defaultValue="0" id="input-Mon" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup >&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Tue">{this.state.tue} - Tue</label>
                                            <Input className="form-control" defaultValue="0" id="input-Tue" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Wes">{this.state.wed} - Wed </label>
                                            <Input className="form-control" defaultValue="0" id="input-Wes" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Thur">{this.state.thur} - Thu</label>
                                            <Input className="form-control" defaultValue="0" id="input-Thur" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Fri"> {this.state.fri} - Fri </label>
                                            <Input className="form-control" defaultValue="0" id="input-Fri" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label" htmlFor="input-Sat"> {this.state.sat} - Sat </label>
                                            <Input className="form-control" defaultValue="0" id="input-Sat" placeholder="Enter Time" type="number" min={0} />
                                        </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                            <label className="form-control-label total-hours" htmlFor="input-Total">Total Hours</label>
                                            <Input className="form-control" defaultValue="0" id="input-Total" placeholder="Enter Time" type="number" min={0} disabled />
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
                                            <label className="">Description:</label>
                                            <textarea className="form-control" cols="5" placeholder="Short description.." ></textarea></div>

                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        { /* END panel */}
                    </div>
                </ContentWrapper>
            </div>
        );
    }

}

export default DragDropContext(HTML5Backend)(Timesheets);


