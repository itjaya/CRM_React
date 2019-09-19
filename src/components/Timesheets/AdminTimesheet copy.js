
import React from "react";
import $ from "jquery";
import BigCalendar from "react-big-calendar";
import moment from 'moment';

// import "fullcalendar/dist/fullcalendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./timesheet.css"
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    FormGroup, Input,
    Container,
    Row,Table,
    UncontrolledTooltip
} from "reactstrap";
// core components

const localizer = BigCalendar.momentLocalizer(moment)

class AdminTimesheet extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        
            date: new Date(2015, 3, 12),
            // divStyle:{ height : 700 },
            navigatedDate: new Date(),
            sun : "", mon:"", tue:"", wes: "", thur:"", fri: "", sat:"",
            days : []

        }
        this.handleView = (view) => {
            // console.log("view", view)
            if (view == "week" && view != "month") {
                document.getElementById("monthView").style.display = "none";
                var dates = moment(this.state.navigatedDate)
                this.setState ({ sun : dates.day(0).toDate().getDate(), mon : dates.day(1).toDate().getDate(),tue : dates.day(2).toDate().getDate(),wed : dates.day(3).toDate().getDate(),thur : dates.day(4).toDate().getDate(),fri : dates.day(5).toDate().getDate(),sat : dates.day(6).toDate().getDate()})
                this.setState({ divStyle: { height: 100 } })
                document.getElementById("hide/show").style.display = "block";

            }
            else {
                // console.log("month", view)
                // this.setState({ divStyle: { height: 700 } })
                document.getElementById("monthView").style.display = "block";

                document.getElementById("hide/show").style.display = "none";

            }
        }
        this.onNavigate=(navigate, flipUnit, prevOrNext)=> {
            // console.log(flipUnit, prevOrNext)
           var dates =  moment(navigate)
            this.setState ({ sun : dates.day(0).toDate().getDate(), mon : dates.day(1).toDate().getDate(),tue : dates.day(2).toDate().getDate(),wed : dates.day(3).toDate().getDate(),thur : dates.day(4).toDate().getDate(),fri : dates.day(5).toDate().getDate(),sat : dates.day(6).toDate().getDate()})

        }
    }

    componentDidMount() {
        document.getElementById("hide/show").style.display = "none";
        var days1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // function getDaysInMonth(month, year) {
        // Since no month has fewer than 28 days
        var today = moment().toDate()
        var startDate = moment([today.getFullYear(), today.getMonth()]);
        var date = moment(startDate).toDate();
        var month = date.getMonth();
        var daysInaMonth = moment().daysInMonth();

        var days = [];
        // console.log("startDate", startDate)
        for (let i = 0; i < daysInaMonth; i++) {
            console.log("Hii")
            days.push(days1[date.getDay(i)] + " " + date.getDate());
            date.setDate(date.getDate() + 1);
        }

        // console.log("days", days)
        this.setState({ days: days })
    }

    render() {
        return (
            <>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow"> 
                                <CardFooter className="py-4">
                                    <BigCalendar style={this.state.divStyle}
                                        localizer={localizer}
                                        views = {["month", "week"]}
                                        events={
                                            [{
                                                "title" : "ashok",
                                                "allDay" : false,
                                                "start" : new Date(2018,0,1,10,0),
                                                "end" : new Date(2018,0,1,10,0)

                                            }]
                                        }
                                        startAccessor="start"
                                        endAccessor="end"
                                        defaultDate = {new Date()}
                                        onView={this.handleView}
                                        onNavigate={(date, flipUnit, prevOrNext) => this.onNavigate(date, flipUnit, prevOrNext)}
                                    />
                                    <div id="monthView">

                                        <Table responsive className="table" style={{ borderCollapse: "collapse" }} >
                                            <thead>
                                                <tr>
                                                    {/* <th style={{ textAlign: "center" }}> Client</th> */}
                                                    {this.state.days.map((data, i) => {
                                                        return (
                                                            <th style={{ textAlign: "center" }}>{data.split(" ")[1]}</th>
                                                        )
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {/* <td style={{ padding: "0px", textAlign: "center" }}>Ashok</td> */}
                                                    {this.state.days.map((data, i) => {
                                                        return (
                                                            <td style={{ padding: "0px", textAlign: "center" }}>8:00</td>
                                                        )
                                                    })}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>

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
                                                <Input className="form-control" defaultValue="0" id="input-Fri" placeholder="Enter Time" type="number" min={0}/>
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label" htmlFor="input-Sat"> {this.state.sat} - Sat </label>
                                                <Input className="form-control" defaultValue="0" id="input-Sat" placeholder="Enter Time" type="number" min={0} />
                                            </FormGroup>&nbsp;
                                            <FormGroup className="col-xs-1 col-xs-1-4">
                                                <label className="form-control-label total-hours" htmlFor="input-Total">Total Hours</label>
                                                <Input className="form-control" defaultValue="0" id="input-Total" placeholder="Enter Time" type="number" min={0} disabled/>
                                            </FormGroup>
                                            {/* <FormGroup className="col-lg-2"></FormGroup> */}
                                        </Row>
                                   
                                    </div>  
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    {/* Dark table */}
                  
                </Container>
            </>
        );
    }
}

export default AdminTimesheet;

// import React from "react";
// import $ from "jquery";

// // reactstrap components
// import {
//   Badge,
//   Card,
//   CardBody,
//   CardHeader,
//   CardFooter,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Media,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
//   UncontrolledTooltip
// } from "reactstrap";
// import BootstrapTable from 'react-bootstrap-table-next';
// import Timeline from 'react-calendar-timeline'
// import moment from 'moment'
// // core components
// import Header from "../../components/Headers/Header.jsx";
// import DataTable from "./database.jsx";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// class timesheets extends React.Component {
//   componentDidMount() {
//     $(document).ready(function () {

//       $("#example").DataTable({
//         language: {
//           paginate: {
//             next: '<i class="fas fa-angle-right">',
//             previous: '<i class="fas fa-angle-left">'
//           }
//         }
//       });
//     })
//   }
//   render() {
//     const columns = [{
//       dataField: 'id',
//       text: 'Product ID',
//       sort: true
//     }, {
//       dataField: 'name',
//       text: 'Product Name',
//       sort: true
//     }, {
//       dataField: 'price',
//       text: 'Product Price',
//       sort: true
//     }];

//     const products = [
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 },
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 102 }
//     ];

//     return (
//       <>
//         <Header />
//         {/* Page content */}
//         <Container className="mt--7" fluid>
//           {/* Table */}
//           <Row>
//             <div className="col">
//               <Card className="shadow">
//                 <CardHeader className="border-0">
//                   <h3 className="mb-0">Employees</h3>
//                 </CardHeader>

//                 <CardFooter className="py-4">
//                   <div class="table-responsive">
//                     <BootstrapTable
//                       id="example"
//                       keyField='id'
//                       data={products}
//                       columns={columns}
//                     />
//                   </div>
//                 </CardFooter>
//               </Card>
//             </div>
//           </Row>
//           {/* Dark table */}
//         </Container>
//       </>
//     );
//   }
// }

// export default timesheets;
