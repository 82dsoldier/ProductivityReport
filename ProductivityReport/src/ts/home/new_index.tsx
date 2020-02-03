import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProductivityEntry } from '../modules/productivity-entry';
import { Table, Container, Nav, Navbar, Row, Col, Form, FormControlProps, Button, FormControl } from 'react-bootstrap';
import '../../scss/common.scss';

class SelectEntry {
  value: string;
  text: string;
  isSelected: boolean;
}

const Index: React.FC = () => {
  const [entries, setEntries] = React.useState([] as ProductivityEntry[]);
  const [err, setError] = React.useState('');
  const [showCustom, setShowCustom] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null as Date);
  const [endDate, setEndDate] = React.useState(null as Date);
  const [webSites, setWebSites] = React.useState([] as SelectEntry[]);
  const [devices, setDevices] = React.useState([] as SelectEntry[]);
  const [selectedWebSite, setSelectedWebSite] = React.useState('');
  const [selectedDevice, setSelectedDevice] = React.useState('');

  let startIndex: number = 0;

  const fetchData = async () => {
    let url = new URL(window.location.protocol + '//' + window.location.host + '/api/ProductivityReport');
    url.searchParams.append('startDate', startDate ? startDate.toISOString() : null);
    url.searchParams.append('endDate', endDate ? endDate.toISOString() : null);
    url.searchParams.append('website', selectedWebSite);
    url.searchParams.append('device', selectedDevice);

    const res = await fetch(url.href);

    res.json()
      .then((data) => {
        setEntries(data);
      })
      .catch(err => setError(err));

  }

  React.useEffect(() => {
    fetchData();
    fetch('/api/Conversations/GetWebsites')
      .then((response) => response.json())
    .then((data) => {
        let webList: SelectEntry[] = new Array();
        webList.push({
          text: '',
          value: '0',
          isSelected: true
        });
        data.map((item) => {
          webList.push({
            text: item,
            value: item,
            isSelected: false
          });
        });
        setWebSites(webList);
    })
      .catch(err => setError(err));

    fetch('/api/Visitors/GetDevices')
      .then((response) => response.json())
    .then((data) => {
        let deviceList: SelectEntry[] = new Array();
        deviceList.push({
          text: '',
          value: '0',
          isSelected: true
        });
        data.map((item) => {
          deviceList.push({
            text: item,
            value: item,
            isSelected: false
          })
        });
        setDevices(deviceList);
    }).catch(err => setError(err));
 }, []);

  const onDateFilterChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value == '1') {
      setShowCustom(false);
    } else {
      setShowCustom(true);
    }
    return true;
  }

  const onCustomDateFilterChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let sd: Date = new Date();
    let ed: Date = new Date();

    switch (evt.currentTarget.value) {
      case '0': {
        fetchData();
        break;
      }
      case '1': {
        setStartDate(sd);
        setEndDate(ed);
        fetchData();
        break;
      }
      case '2': {
        sd.setDate(sd.getDate() - 1);
        setStartDate(sd);
        setEndDate(sd);
        fetchData();
        break;
      }
      case '3': {
        let day = startDate.getDay();
        let diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
        sd.setDate(diff);
        ed.setDate(sd.getDate() + 6);
        setStartDate(sd);
        setEndDate(ed);
        fetchData();
        break;
      }
      case '4': {
        sd.setDate(sd.getDate() - 7);
        let day = sd.getDay();
        let diff = sd.getDate() - day + (day === 0 ? -6 : 1);
        sd.setDate(diff);
        ed.setDate(sd.getDate() + 6);
        setStartDate(sd);
        setEndDate(ed);
        fetchData();
        break;
      }
      case '5': {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        setStartDate(firstDay);
        setEndDate(lastDay);
        fetchData();
        break;
      }
      case '6': {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        setStartDate(firstDay);
        setEndDate(lastDay);
        fetchData();
        break;
      }
      case '7': {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), 0, 1);
        let lastDay = new Date(date.getFullYear(), 11, 31);
        setStartDate(firstDay);
        setEndDate(lastDay);
        fetchData();
        break;
      }
      case '8': {
        let date = new Date();
        let firstDay = new Date(date.getFullYear() - 1, 0, 1);
        let lastDay = new Date(date.getFullYear() - 1, 11, 31);
        setStartDate(firstDay);
        setEndDate(lastDay);
        fetchData();
        break;
      }
    }
  }

  const onCustomStartDateChanged = (evt: React.FormEvent<HTMLInputElement>) => {
    let date = new Date(evt.currentTarget.value)
    setStartDate(date);
    fetchData();
  }

  const onCustomEndDateChanged = (evt: React.FormEvent<HTMLInputElement>) => {
    let date = new Date(evt.currentTarget.value);
    setEndDate(date);
    fetchData();
  }

  const onSelectedWebsiteChanged = (evt: React.FormEvent<HTMLSelectElement>) => {
    setSelectedWebSite(evt.currentTarget.value);
    fetchData();
  }

  const onSelectedDeviceChanged = (evt: React.FormEvent<HTMLSelectElement>) => {
    setSelectedDevice(evt.currentTarget.value);
    fetchData();
  }

  const onClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedWebSite(null);
    setSelectedDevice(null);
    fetchData();
  }

  return (
    <React.Fragment>
      <Container >
        <Row>
          <h3>Productivity Report</h3>
        </Row>
        <Row>
          <div>{err}</div>
          </Row>
        <Row>
          <Col md='12'>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>S. No</td>
                  <td>Operator Name</td>
                  <td>Proactive Sent</td>
                  <td>Proactive Answered</td>
                  <td>Proactive Response Rate</td>
                  <td>Reactive Received</td>
                  <td>Reactive Answered</td>
                  <td>Reactive Response Rate</td>
                  <td>Total Chat Length</td>
                  <td>Average Chat Length</td>
                </tr>
              </thead>
              <tbody>
                {entries.map((item) =>
                  <tr>
                    <td>{item.operatorID}</td>
                    <td>{item.name}</td>
                    <td>{item.proactiveSent}</td>
                    <td>{item.proactiveAnswered}</td>
                    <td>{item.proactiveResponseRate}</td>
                    <td>{item.reactiveReceived}</td>
                    <td>{item.reactiveAnswered}</td>
                    <td>{item.reactiveResponseRate}</td>
                    <td>{item.totalChatLength}</td>
                    <td>{item.averageChatLength}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md='2'><h4>Filtering</h4></Col>
        </Row>
        <Row>
          <Col md='1' style={{ fontWeight: 'bold' }}>Date</Col>
          <Form.Group as={Col} md='2' controlId='dateFilter'>
            <Form.Check type='radio' id='predefinedDateFilter' label='Predefined' value='1' checked={!showCustom} onChange={onDateFilterChanged} />
            <Form.Check type='radio' id='customDateFilter' label='Custom' value='2' checked={showCustom} onChange={onDateFilterChanged}/>
          </Form.Group>
          <Col md='6'>
            <span style={showCustom ? { display: 'none' } : { display: 'block' }}>
              <Form.Control as='select' onChange={onCustomDateFilterChanged}>
                <option value='0'></option>
                <option value='1'>Today</option>
                <option value='2'>Yesterday</option>
                <option value='3'>This Week</option>
                <option value='4'>Last Week</option>
                <option value='5'>This Month</option>
                <option value='6'>Last Month</option>
                <option value='7'>This Year</option>
                <option value='8'>Last Year</option>
              </Form.Control>
            </span>
            <span style={showCustom ? { display: 'block' } : { display: 'none' }}>
              <Col md='6' style={{ display: 'inline-block' }}><label>Start Date<Form.Control type='text' onBlur={onCustomStartDateChanged} /></label></Col>
              <Col md='6' style={{ display: 'inline-block' }}><label>End Date<Form.Control type='text' onBlur={onCustomEndDateChanged} /></label></Col>
            </span>
          </Col>
        </Row>
        <Row>
          <Col md='1' style={{ fontWeight: 'bold' }}>Web site</Col>
          <Col md='2'>
            <Form.Control as='select' onChange={onSelectedWebsiteChanged}>
              {webSites.map((item) =>
                <option value={item.value} selected={item.isSelected}>{item.text}</option>
              )}
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col md='1' style={{ fontWeight: 'bold' }}>Device</Col>
          <Col md='2'>
            <Form.Control as='select' onChange={onSelectedDeviceChanged}>
              {devices.map((item) =>
                <option value={item.value} selected={item.isSelected}>{item.text}</option>
              )}
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col md='1'><Button onClick={onClear}>Clear</Button></Col>
        </Row>
        <Row>
          <p>This is the site as I would remake it if it were givent to me as a project with no technology restrictions.</p>
          <ul>
            <li>Rather than relying on MVC to fetch data, I have added a data layer for the project.  This data layer is based on Entity Framework Core and provides a context with models and services for fetching data.  This separates the data layer into a separate project for easier debugging and programming.  If necessary, the common components such as models and interfaces could be pulled out of the data layer and placed into a &quot;common&quot; library.  This would allow complete decoupling and even replacing of the data layer if necessary.  The same app could then be run against may different data sources by simply replacing one file.</li>
            <li>In addition to having a separate data layer, I have provided an API for data retrieval.  This allows simpler sharing of data between applications.</li>
            <li>The front end has been rewritten using React and react-bootstrap.  I like to use react because it allows me to create reusable components that can be dropped into any page where they are needed.  Its use of state for data refresh also reduces the complexity of code as I don't have to worry about refreshing the page and reassigning values to components.</li>
          </ul>
          <p>TODO for this version:</p>
          <ul>
            <li>Move the connection string to an application configuration file with encryption if possible.</li>
            <li>Ensure that the site is running under a service account that can be used to access the database to prevent embedding a username and password in the connection string.</li>
            <li>Fix the issue that is requiring the website to be selected twice before the filtering will change.</li>
            <li>Verify that the totals are correct when applying filtering by website and device at the same time.</li>
          </ul>
          <p>The last two issues are items that I should have had fixed before sending the application in except that I simply ran out of time.  If I were working on an actual application, I would have mitigated this with the following:</p>
          <ul>
            <li>There should be unit tests on the data layer and the API to ensure that they are providing correct data for known parameters</li>
            <li>Even without unit tests, I would have known parameters with which to test.  At present, I don't know enough about the data set with which I am working and do not have accurate counts that should be returned for different filter types.</li>
          </ul>
        </Row>
     </Container>
    </React.Fragment>
  );
}

ReactDOM.render(<Index />, document.getElementById('app'));