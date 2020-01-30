import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProductivityEntry } from '../modules/productivity-entry';
import { Table, Container, Nav, Navbar } from 'react-bootstrap';

const Index: React.FC = () => {
  const [entries, setEntries] = React.useState([] as ProductivityEntry[]);
  const [err, setError] = React.useState('');
  let startIndex: number = 0;


  const fetchData = async () => {
    const res = await fetch('/api/ProductivityReport');

    res.json()
      .then((data) => {
        setEntries(data);
      })
      .catch(err => setError(err));
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Productivity Report</Navbar.Brand>
      </Navbar>
      <Container>
      </Container>
      <Container>
        <Table striped bordered>
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
      </Container>
    </React.Fragment>
  );
}

ReactDOM.render(<Index />, document.getElementById('app'));