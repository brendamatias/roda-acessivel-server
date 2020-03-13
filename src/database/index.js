import Sequelize from 'sequelize';

import User from '../app/models/User';
import Category from '../app/models/Category';
import Location from '../app/models/Location';
import Address from '../app/models/Address';
import File from '../app/models/File';
import Evaluation from '../app/models/Evaluation';

import databaseConfig from '../config/database';

const models = [User, Category, Location, Address, File, Evaluation];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(process.env.DATABASE_URL, databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
