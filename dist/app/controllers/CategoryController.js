"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class CategoryController {
  async index(req, res) {
    const categories = await _Category2.default.findAll();

    return res.json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await _User2.default.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para criação de novas categorias.',
      });
    }

    const categoryExists = await _Category2.default.findOne({
      where: { name: req.body.name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const { id, name } = await _Category2.default.create(req.body);

    return res.json({
      id,
      name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await _User2.default.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para alterar categorias.',
      });
    }

    const { id, name } = req.body;
    const category = await _Category2.default.findByPk(id);

    if (!category) {
      return res.status(400).json({ error: 'Categoria não existente.' });
    }

    if (name && name !== category.name) {
      const categoryExists = await _Category2.default.findOne({
        where: { name },
      });

      if (categoryExists) {
        return res.status(400).json({ error: 'Categoria já existente' });
      }
    }

    const categoryUpdate = await category.update(req.body);

    return res.json({
      categoryUpdate,
    });
  }

  async delete(req, res) {
    const user = await _User2.default.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error: 'Você não tem permissão para deletar categorias.',
      });
    }

    const category = await _Category2.default.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: 'Categoria não existente.',
      });
    }

    _Category2.default.destroy({
      where: { id: req.params.id },
    });

    return res.status(200).json({ success: 'Categoria deletada com sucesso!' });
  }
}

exports. default = new CategoryController();
