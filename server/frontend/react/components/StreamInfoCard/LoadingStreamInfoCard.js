"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const react_1 = __importDefault(require("react"));
const LoadingSpinner_1 = __importDefault(require("../LoadingSpinner"));
function LoadingStreamInfoCard(props) {
    return (react_1.default.createElement("div", { className: "StreamInfoCard", "data-type": "loading" },
        react_1.default.createElement(LoadingSpinner_1.default, null)));
}
;
module.exports = LoadingStreamInfoCard;
//# sourceMappingURL=LoadingStreamInfoCard.js.map