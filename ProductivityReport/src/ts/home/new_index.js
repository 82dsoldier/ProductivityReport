"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_bootstrap_1 = require("react-bootstrap");
require("../../scss/common.scss");
var SelectEntry = (function () {
    function SelectEntry() {
    }
    return SelectEntry;
}());
var Index = function () {
    var _a = React.useState([]), entries = _a[0], setEntries = _a[1];
    var _b = React.useState(''), err = _b[0], setError = _b[1];
    var _c = React.useState(false), showCustom = _c[0], setShowCustom = _c[1];
    var _d = React.useState(new Date()), startDate = _d[0], setStartDate = _d[1];
    var _e = React.useState(new Date()), endDate = _e[0], setEndDate = _e[1];
    var _f = React.useState([]), webSites = _f[0], setWebSites = _f[1];
    var _g = React.useState([]), devices = _g[0], setDevices = _g[1];
    var startIndex = 0;
    var fetchData = function (startDate, endDate) { return __awaiter(void 0, void 0, void 0, function () {
        var url, res, web, device;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL(window.location.protocol + '//' + window.location.host + '/api/ProductivityReport');
                    url.searchParams.append('startDate', startDate ? startDate.toISOString() : null);
                    url.searchParams.append('endDate', endDate ? endDate.toISOString() : null);
                    return [4, fetch(url.href)];
                case 1:
                    res = _a.sent();
                    res.json()
                        .then(function (data) {
                        setEntries(data);
                    })
                        .catch(function (err) { return setError(err); });
                    return [4, fetch('/api/Conversations/GetWebsites')];
                case 2:
                    web = _a.sent();
                    web.json()
                        .then(function (data) {
                        var webList = new Array();
                        webList.push({
                            text: '',
                            value: '0',
                            isSelected: true
                        });
                        data.map(function (item) {
                            webList.push({
                                text: item,
                                value: item,
                                isSelected: false
                            });
                        });
                        setWebSites(webList);
                    });
                    return [4, fetch('/api/Visitors/GetDevices')];
                case 3:
                    device = _a.sent();
                    device.json()
                        .then(function (data) {
                        var deviceList = new Array();
                        deviceList.push({
                            text: '',
                            value: '0',
                            isSelected: true
                        });
                        data.map(function (item) {
                            deviceList.push({
                                text: item,
                                value: item,
                                isSelected: false
                            });
                        });
                        setDevices(deviceList);
                    });
                    return [2];
            }
        });
    }); };
    React.useEffect(function () {
        fetchData();
    }, []);
    var onDateFilterChanged = function (evt) {
        if (evt.currentTarget.value == '1') {
            setShowCustom(false);
        }
        else {
            setShowCustom(true);
        }
        return true;
    };
    var onCustomDateFilterChanged = function (evt) {
        var sd = new Date();
        var ed = new Date();
        switch (evt.currentTarget.value) {
            case '0': {
                fetchData();
                break;
            }
            case '1': {
                setStartDate(sd);
                setEndDate(ed);
                fetchData(sd, ed);
                break;
            }
            case '2': {
                sd.setDate(sd.getDate() - 1);
                setStartDate(sd);
                setEndDate(sd);
                fetchData(sd, sd);
                break;
            }
            case '3': {
                var day = startDate.getDay();
                var diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
                sd.setDate(diff);
                ed.setDate(sd.getDate() + 6);
                setStartDate(sd);
                setEndDate(ed);
                fetchData(sd, ed);
                break;
            }
            case '4': {
                sd.setDate(sd.getDate() - 7);
                var day = sd.getDay();
                var diff = sd.getDate() - day + (day === 0 ? -6 : 1);
                sd.setDate(diff);
                ed.setDate(sd.getDate() + 6);
                setStartDate(sd);
                setEndDate(ed);
                fetchData(sd, ed);
                break;
            }
            case '5': {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                setStartDate(firstDay);
                setEndDate(lastDay);
                fetchData(firstDay, lastDay);
                break;
            }
            case '6': {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
                setStartDate(firstDay);
                setEndDate(lastDay);
                fetchData(firstDay, lastDay);
                break;
            }
            case '7': {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), 0, 1);
                var lastDay = new Date(date.getFullYear(), 11, 31);
                setStartDate(firstDay);
                setEndDate(lastDay);
                fetchData(firstDay, lastDay);
                break;
            }
            case '8': {
                var date = new Date();
                var firstDay = new Date(date.getFullYear() - 1, 0, 1);
                var lastDay = new Date(date.getFullYear() - 1, 11, 31);
                setStartDate(firstDay);
                setEndDate(lastDay);
                fetchData(firstDay, lastDay);
                break;
            }
        }
    };
    var onCustomStartDateChanged = function (evt) {
        var date = new Date(evt.currentTarget.value);
        setStartDate(date);
        fetchData(date, endDate);
    };
    var onCustomEndDateChanged = function (evt) {
        var date = new Date(evt.currentTarget.value);
        setEndDate(date);
        fetchData(startDate, endDate);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(react_bootstrap_1.Container, null,
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement("h3", null, "Productivity Report")),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { md: '12' },
                    React.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, hover: true, responsive: true },
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
                            return React.createElement("tr", null,
                                React.createElement("td", null, item.operatorID),
                                React.createElement("td", null, item.name),
                                React.createElement("td", null, item.proactiveSent),
                                React.createElement("td", null, item.proactiveAnswered),
                                React.createElement("td", null, item.proactiveResponseRate),
                                React.createElement("td", null, item.reactiveReceived),
                                React.createElement("td", null, item.reactiveAnswered),
                                React.createElement("td", null, item.reactiveResponseRate),
                                React.createElement("td", null, item.totalChatLength),
                                React.createElement("td", null, item.averageChatLength));
                        }))))),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { md: '2' },
                    React.createElement("h4", null, "Filtering"))),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { md: '1', style: { fontWeight: 'bold' } }, "Date"),
                React.createElement(react_bootstrap_1.Form.Group, { as: react_bootstrap_1.Col, md: '2', controlId: 'dateFilter' },
                    React.createElement(react_bootstrap_1.Form.Check, { type: 'radio', id: 'predefinedDateFilter', label: 'Predefined', value: '1', checked: !showCustom, onChange: onDateFilterChanged }),
                    React.createElement(react_bootstrap_1.Form.Check, { type: 'radio', id: 'customDateFilter', label: 'Custom', value: '2', checked: showCustom, onChange: onDateFilterChanged })),
                React.createElement(react_bootstrap_1.Col, { md: '6' },
                    React.createElement("span", { style: showCustom ? { display: 'none' } : { display: 'block' } },
                        React.createElement(react_bootstrap_1.Form.Control, { as: 'select', onChange: onCustomDateFilterChanged },
                            React.createElement("option", { value: '0' }),
                            React.createElement("option", { value: '1' }, "Today"),
                            React.createElement("option", { value: '2' }, "Yesterday"),
                            React.createElement("option", { value: '3' }, "This Week"),
                            React.createElement("option", { value: '4' }, "Last Week"),
                            React.createElement("option", { value: '5' }, "This Month"),
                            React.createElement("option", { value: '6' }, "Last Month"),
                            React.createElement("option", { value: '7' }, "This Year"),
                            React.createElement("option", { value: '8' }, "Last Year"))),
                    React.createElement("span", { style: showCustom ? { display: 'block' } : { display: 'none' } },
                        React.createElement(react_bootstrap_1.Col, { md: '6', style: { display: 'inline-block' } },
                            React.createElement("label", null,
                                "Start Date",
                                React.createElement(react_bootstrap_1.Form.Control, { type: 'text', onBlur: onCustomStartDateChanged }))),
                        React.createElement(react_bootstrap_1.Col, { md: '6', style: { display: 'inline-block' } },
                            React.createElement("label", null,
                                "End Date",
                                React.createElement(react_bootstrap_1.Form.Control, { type: 'text', onBlur: onCustomEndDateChanged })))))),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { md: '1', style: { fontWeight: 'bold' } }, "Web site"),
                React.createElement(react_bootstrap_1.Col, { md: '2' },
                    React.createElement(react_bootstrap_1.Form.Control, { as: 'select' }, webSites.map(function (item) {
                        return React.createElement("option", { value: item.value, selected: item.isSelected }, item.text);
                    })))),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { md: '1', style: { fontWeight: 'bold' } }, "Device"),
                React.createElement(react_bootstrap_1.Col, { md: '2' },
                    React.createElement(react_bootstrap_1.Form.Control, { as: 'select' }, devices.map(function (item) {
                        return React.createElement("option", { value: item.value, selected: item.isSelected }, item.text);
                    })))))));
};
ReactDOM.render(React.createElement(Index, null), document.getElementById('app'));
//# sourceMappingURL=new_index.js.map