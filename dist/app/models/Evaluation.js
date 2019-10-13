"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Evaluation extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        entry_note: _sequelize2.default.INTEGER,
        parking_note: _sequelize2.default.INTEGER,
        circulation_note: _sequelize2.default.INTEGER,
        bathroom_note: _sequelize2.default.INTEGER,
        comment: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

exports. default = Evaluation;
