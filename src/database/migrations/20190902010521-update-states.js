module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('states', [
      {
        uf: 'AC',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'AL',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'AP',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'AM',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'BA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'CE',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'DF',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'ES',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'GO',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'MA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'MT',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'MS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'MG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'PA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'PB',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'PR',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'PE',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'PI',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'RJ',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'RN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'RS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'RO',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'RR',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'SC',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'SP',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'SE',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uf: 'TO',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.dropTable('states');
  },
};
