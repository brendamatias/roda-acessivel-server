"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Evaluation = require('../models/Evaluation'); var _Evaluation2 = _interopRequireDefault(_Evaluation);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Location = require('../models/Location'); var _Location2 = _interopRequireDefault(_Location);

class EvaluationController {
  async index(req, res) {
    const evaluations = await _Evaluation2.default.findAll({
      where: { location_id: req.params.id },
    });

    return res.json(evaluations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      entry_note: Yup.string()
        .required()
        .max(1),
      parking_note: Yup.string()
        .required()
        .max(1),
      circulation_note: Yup.string()
        .required()
        .max(1),
      bathroom_note: Yup.string()
        .required()
        .max(1),
      comment: Yup.string(),
      location_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { location_id } = req.body;

    const userExists = await _User2.default.findOne({ where: { id: req.userId } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente!' });
    }

    const locationExists = await _Location2.default.findOne({
      where: { id: location_id },
    });

    if (!locationExists) {
      return res.status(400).json({ error: 'Localização não existente!' });
    }

    const {
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
      comment,
    } = req.body;

    await _Evaluation2.default.create({
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
      comment,
      location_id,
      user_id: req.userId,
    });
    return res.json({ success: 'Avaliação registrada com sucesso!' });
  }
}
exports. default = new EvaluationController();
