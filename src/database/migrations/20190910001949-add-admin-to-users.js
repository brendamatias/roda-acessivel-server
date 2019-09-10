module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'admin', {
      type: Sequelize.STRING(1),
      defaultValue: 'N',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.add('users', 'admin');
  },
};
