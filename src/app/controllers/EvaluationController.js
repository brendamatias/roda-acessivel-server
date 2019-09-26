import * as Yup from 'yup';
import Evaluation from '../models/Evaluation';
import User from '../models/User';
import Location from '../models/Location';
import Comment from '../models/Comment';

class EvaluationController {
  async index(req, res) {
    const evaluations = await Evaluation.findAll({
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
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { location_id } = req.body;

    const userExists = await User.findOne({ where: { id: req.userId } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente.' });
    }

    const location = await Location.findOne({
      where: { id: location_id },
    });

    if (!location) {
      return res.status(400).json({ error: 'Localização não existente.' });
    }

    const {
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
      comment: content,
    } = req.body;

    if (content && content.length > 0) {
      const { id } = await Comment.create({ content });

      location.setComments(id);
    }

    await Evaluation.create({
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
      comment: content,
      location_id,
      user_id: req.userId,
    });

    return res.json({ success: 'Avaliação registrada com sucesso!' });
  }
}
export default new EvaluationController();
