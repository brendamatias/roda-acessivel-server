import Sequelize from 'sequelize';

import User from '../app/models/User';
import Category from '../app/models/Category';
import Location from '../app/models/Location';
import Address from '../app/models/Address';

import databaseConfig from '../config/database';

const models = [User, Category, Location, Address];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
