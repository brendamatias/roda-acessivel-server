"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Category = require('../app/models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _Location = require('../app/models/Location'); var _Location2 = _interopRequireDefault(_Location);
var _Address = require('../app/models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Evaluation = require('../app/models/Evaluation'); var _Evaluation2 = _interopRequireDefault(_Evaluation);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Category2.default, _Location2.default, _Address2.default, _File2.default, _Evaluation2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
