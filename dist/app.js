"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
  }

  /* Para enviar e receber requisições em formato Json */
  middlewares() {
    this.server.use(_express2.default.json());
    this.server.use(_cors2.default.call(void 0, ));
  }

  routes() {
    this.server.use(_routes2.default);
  }
}

exports. default = new App().server;
