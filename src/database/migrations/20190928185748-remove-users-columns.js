module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'gender'),
      queryInterface.removeColumn('users', 'date_of_birth'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'gender', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('users', 'date_of_birth', {
        type: Sequelize.DATE,
      }),
    ]);
  },
};
