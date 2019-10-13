"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Location extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'address',
    });
    this.belongsTo(models.File, {
      foreignKey: 'image_id',
      as: 'image',
    });
  }
}

exports. default = Location;
