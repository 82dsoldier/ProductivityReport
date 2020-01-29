"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_bootstrap_1 = require("react-bootstrap");
var Index = function () {
    var startIndex = 0;
    var _a = React.useState([]), entries = _a[0], setEntries = _a[1];
    React.useEffect(function () {
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(react_bootstrap_1.Table, { striped: true, bordered: true },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "S. No"),
                    React.createElement("td", null, "Operator Name"),
                    React.createElement("td", null, "Proactive Sent"),
                    React.createElement("td", null, "Proactive Answered"),
                    React.createElement("td", null, "Proactive Response Rate"),
                    React.createElement("td", null, "Reactive Received"),
                    React.createElement("td", null, "Reactive Answered"),
                    React.createElement("td", null, "Reactive Response Rate"),
                    React.createElement("td", null, "Total Chat Length"),
                    React.createElement("td", null, "Average Chat Length"))),
            React.createElement("tbody", null, entries.map(function (item) {
                React.createElement("tr", null,
                    React.createElement("td", null),
                    React.createElement("td", null, item.operatorName),
                    React.createElement("td", null, item.proactiveSent),
                    React.createElement("td", null, item.proactiveAnswered),
                    React.createElement("td", null, item.proactiveAnswered / item.proactiveSent),
                    React.createElement("td", null, item.reactiveReceived),
                    React.createElement("td", null, item.reactiveAnswered),
                    React.createElement("td", null, item.reactiveAnswered / item.reactiveReceived),
                    React.createElement("td", null, item.totalChatLength),
                    React.createElement("td", null, item.averageChatLength));
            })))));
};
ReactDOM.render(React.createElement(Index, null), document.getElementById('app'));
//# sourceMappingURL=index.js.map