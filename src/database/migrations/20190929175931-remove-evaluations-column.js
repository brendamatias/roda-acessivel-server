module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('evaluations', 'comment');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('evaluations', 'comment', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
