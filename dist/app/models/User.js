"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        gender: _sequelize2.default.STRING,
        date_of_birth: _sequelize2.default.DATE,
        admin: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      /*
        Validação para o hash ser gerado apenas quando tiver
        inserindo ou alterando a senha
      */
      if (user.password) {
        /*
          8: número de rounds(força) da minha criptografia
        */
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
