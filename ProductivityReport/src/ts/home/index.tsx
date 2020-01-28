import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProductivityEntry } from '../modules/productivity-entry';
import { Table } from 'react-bootstrap';

const Index: React.FC = () => {
  let startIndex: number = 0;

  const [entries, setEntries] = React.useState([] as ProductivityEntry[]);

  React.useEffect(() => {

  });

  return (
    <React.Fragment>
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
          {entries.map((item) => {
            <tr>
              <td></td>
              <td>{item.operatorName}</td>
              <td>{item.proactiveSent}</td>
              <td>{item.proactiveAnswered}</td>
              <td>{item.proactiveAnswered / item.proactiveSent}</td>
              <td>{item.reactiveReceived}</td>
              <td>{item.reactiveAnswered}</td>
              <td>{item.reactiveAnswered / item.reactiveReceived}</td>
              <td>{item.totalChatLength}</td>
              <td>{item.averageChatLength}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

ReactDOM.render(<Index />, document.getElementById('app'));