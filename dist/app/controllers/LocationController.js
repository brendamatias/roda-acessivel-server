"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _api = require('../../services/api'); var _api2 = _interopRequireDefault(_api);
var _Location = require('../models/Location'); var _Location2 = _interopRequireDefault(_Location);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class LocationController {
  async index(req, res) {
    if (req.params.id) {
      const location = await _Location2.default.findByPk(req.params.id);
      if (!location) {
        return res.status(404).json({
          error: 'Localidade não existente.',
        });
      }

      return res.json(location);
    }

    const { page = 1 } = req.query;

    const locations = await _Location2.default.findAll({
      order: ['id'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'name'],
      include: [
        {
          model: _Category2.default,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: _Address2.default,
          as: 'address',
          attributes: [
            'id',
            'street',
            'number',
            'neighborhood',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: _File2.default,
          as: 'image',
          attributes: ['id', 'path'],
        },
      ],
    });

    return res.json(locations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      category_id: Yup.string().required(),
      number: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .min(8)
        .max(9),
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

    const locationExists = await _Location2.default.findOne({
      where: { name: req.body.name },
    });

    if (locationExists) {
      return res.status(400).json({ error: 'Localização já cadastrada' });
    }

    const categoryExists = await _Category2.default.findOne({
      where: { id: req.body.category_id },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: 'Categoria não existente!' });
    }

    const response = await _api2.default
      .get(`${req.body.zip_code}/json/`)
      .catch(error => {
        return res.status(400).json({ error });
      });

    const addressExists = await _Address2.default.findOne({
      where: {
        number: req.body.number,
        zip_code: response.data.cep,
      },
    });

    if (addressExists) {
      return res.status(400).json({ error: 'Endereço já cadastrado!' });
    }

    const { id: address_id } = await _Address2.default.create({
      street: response.data.logradouro,
      number: req.body.number,
      neighborhood: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
      zip_code: response.data.cep,
    });

    const { name, category_id } = req.body;

    const location = await _Location2.default.create({
      name,
      address_id,
      category_id,
    });

    return res.json(location);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      category_id: Yup.string(),
      zip_code: Yup.string()
        .min(8)
        .max(9),
      number: Yup.string().when('zip_code', (number, field) =>
        number ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await _User2.default.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para alterar localidades.',
      });
    }

    const { id, name } = req.body;
    const location = await _Location2.default.findByPk(id);

    if (!location) {
      return res.status(400).json({ error: 'Localidade não existente.' });
    }

    if (name && name !== location.name) {
      const locationExists = await _Location2.default.findOne({
        where: { name },
      });

      if (locationExists) {
        return res.status(400).json({ error: 'Localidade já existente.' });
      }
    }

    if (req.body.zip_code) {
      const response = await _api2.default
        .get(`${req.body.zip_code}/json/`)
        .catch(error => {
          return res.status(400).json({ error });
        });

      const addressExists = await _Address2.default.findOne({
        where: {
          number: req.body.number,
          zip_code: response.data.cep,
        },
      });

      if (addressExists) {
        return res.status(400).json({ error: 'Endereço já cadastrado!' });
      }

      const address = await _Address2.default.findByPk(location.address_id);

      const addressUpdate = await address.update({
        street: response.data.logradouro,
        number: req.body.number,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
        zip_code: response.data.cep,
      });

      return res.json({
        addressUpdate,
      });
    }

    const locationUpdate = await location.update(req.body);

    return res.json({
      locationUpdate,
    });
  }

  async delete(req, res) {
    const user = await _User2.default.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error: 'Você não tem permissão para deletar localidades.',
      });
    }

    const location = await _Location2.default.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({
        error: 'Localidade não existente.',
      });
    }

    _Location2.default.destroy({
      where: { id: req.params.id },
    });

    return res
      .status(200)
      .json({ success: 'Localidade deletada com sucesso!' });
  }
}

exports. default = new LocationController();
