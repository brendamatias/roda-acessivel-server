module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('cities', [
      {
        name: 'Recife',
        state_id: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Olinda',
        state_id: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jaboatão dos Guararapes',
        state_id: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.dropTable('cities');
  },
};
