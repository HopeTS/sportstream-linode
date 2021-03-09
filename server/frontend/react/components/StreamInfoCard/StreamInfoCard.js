"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const react_1 = __importDefault(require("react"));
const BusinessStreamInfoCard_1 = __importDefault(require("./BusinessStreamInfoCard"));
const LoadingStreamInfoCard_1 = __importDefault(require("./LoadingStreamInfoCard"));
const UserStreamInfoCard_1 = __importDefault(require("./UserStreamInfoCard"));
function StreamInfoCard(props) {
    switch (props.type) {
        case 'business':
            return react_1.default.createElement(BusinessStreamInfoCard_1.default, Object.assign({}, props));
        case 'user':
            return react_1.default.createElement(UserStreamInfoCard_1.default, Object.assign({}, props));
        default:
            return react_1.default.createElement(LoadingStreamInfoCard_1.default, null);
    }
}
module.exports = StreamInfoCard;
//# sourceMappingURL=StreamInfoCard.js.map