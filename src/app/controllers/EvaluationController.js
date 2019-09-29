import * as Yup from 'yup';
import Evaluation from '../models/Evaluation';
import User from '../models/User';
import Location from '../models/Location';

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

    const locationExists = await Location.findOne({
      where: { id: location_id },
    });

    if (!locationExists) {
      return res.status(400).json({ error: 'Localização não existente.' });
    }

    const {
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
    } = req.body;

    const evaluationExists = await Evaluation.findOne({
      where: { location_id, user_id: req.userId },
    });

    if (evaluationExists) {
      await evaluationExists.update({
        entry_note,
        parking_note,
        circulation_note,
        bathroom_note,
      });

      return res.json({ success: 'Avaliação registrada com sucesso!' });
    }

    await Evaluation.create({
      entry_note,
      parking_note,
      circulation_note,
      bathroom_note,
      location_id,
      user_id: req.userId,
    });

    return res.json({ success: 'Avaliação registrada com sucesso!' });
  }
}
export default new EvaluationController();
