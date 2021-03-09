"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const react_1 = __importStar(require("react"));
function BusinessStreamInfoCard(props) {
    react_1.useEffect(() => {
        console.log(props);
    }, []);
    return (react_1.default.createElement("div", { className: "StreamInfoCard", "data-type": "business" },
        react_1.default.createElement("section", null,
            react_1.default.createElement("p", { className: "StreamInfoCard__field" }, props.field),
            react_1.default.createElement("p", { className: "StreamInfoCard__status" }, props.status),
            react_1.default.createElement("p", { className: "StreamInfoCard__key" }, props.streamKey))));
}
;
module.exports = BusinessStreamInfoCard;
//# sourceMappingURL=BusinessStreamInfoCard.js.map