import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
  static init(sequelize) {
    super.init(
      {
        entry_note: Sequelize.INTEGER,
        parking_note: Sequelize.INTEGER,
        circulation_note: Sequelize.INTEGER,
        bathroom_note: Sequelize.INTEGER,
        comment: Sequelize.STRING,
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

export default Evaluation;
