import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Location, {
      through: 'comments_locations',
      as: 'locations',
      foreignKey: 'comment_id',
    });
  }
}

export default Comment;
