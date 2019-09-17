import Sequelize, { Model } from 'sequelize';

class Location extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
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

export default Location;
