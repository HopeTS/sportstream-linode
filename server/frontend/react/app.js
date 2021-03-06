"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
require("normalize.css/normalize.css");
require("../sass/main.scss");
const storeConfig_js_1 = __importDefault(require("./redux/store/storeConfig.js"));
const Router_js_1 = __importDefault(require("./routers/Router.js"));
class App {
    constructor() {
        this.$appRoot = document.querySelector('#app');
        this.configure_store();
        this.configure_tsx();
    }
    configure_store() {
        this.store = storeConfig_js_1.default();
        this.store.subscribe(() => {
        });
    }
    configure_tsx() {
        this.tsx = (react_1.default.createElement(react_redux_1.Provider, { store: this.store },
            react_1.default.createElement(Router_js_1.default, null)));
    }
    start() {
        react_dom_1.default.render(this.tsx, this.$appRoot);
    }
}
exports.default = App;
const ReactApp = new App();
ReactApp.start();
module.exports = App;
//# sourceMappingURL=App.js.map