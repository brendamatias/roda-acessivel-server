"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      entry_note: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parking_note: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      circulation_note: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bathroom_note: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('evaluations');
  },
};
