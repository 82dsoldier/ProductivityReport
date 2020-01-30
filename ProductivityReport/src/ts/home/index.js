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
var Index = function () {
    var _a = React.useState([]), entries = _a[0], setEntries = _a[1];
    var _b = React.useState(''), err = _b[0], setError = _b[1];
    var startIndex = 0;
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch('/api/ProductivityReport')];
                case 1:
                    res = _a.sent();
                    res.json()
                        .then(function (data) {
                        setEntries(data);
                    })
                        .catch(function (err) { return setError(err); });
                    return [2];
            }
        });
    }); };
    React.useEffect(function () {
        fetchData();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_bootstrap_1.Navbar, { bg: 'light', expand: 'lg' },
            React.createElement(react_bootstrap_1.Navbar.Brand, { href: '/' }, "Productivity Report")),
        React.createElement(react_bootstrap_1.Container, null),
        React.createElement(react_bootstrap_1.Container, null,
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
                }))))));
};
ReactDOM.render(React.createElement(Index, null), document.getElementById('app'));
//# sourceMappingURL=index.js.map