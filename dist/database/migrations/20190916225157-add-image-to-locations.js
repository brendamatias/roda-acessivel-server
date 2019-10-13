"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('locations', 'image_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('locations', 'image_id');
  },
};
