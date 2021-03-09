"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const react_1 = __importDefault(require("react"));
const HomeButton_1 = __importDefault(require("./HomeButton"));
const DesktopNavigation_1 = __importDefault(require("./DesktopNavigation/DesktopNavigation"));
const MobileNavigation_1 = __importDefault(require("./MobileNavigation/MobileNavigation"));
const links_1 = __importDefault(require("../../config/links"));
function Navigation(props) {
    return (react_1.default.createElement("section", { id: "Navigation" },
        react_1.default.createElement(HomeButton_1.default, null),
        react_1.default.createElement(DesktopNavigation_1.default, { links: links_1.default }),
        react_1.default.createElement(MobileNavigation_1.default, { links: links_1.default })));
}
module.exports = Navigation;
//# sourceMappingURL=Navigation.js.map