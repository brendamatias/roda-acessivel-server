module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Gastronomias',
      },
      {
        name: 'Hospedagens',
      },
      {
        name: 'Praias',
      },
      {
        name: 'Pontos Históricos',
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
