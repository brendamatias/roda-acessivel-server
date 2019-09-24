import * as Yup from 'yup';
import Evaluation from '../models/Evaluation';
import User from '../models/User';
import Location from '../models/Location';

class EvaluationController {
  async store(req, res) {
    const { user } = req.headers;
    console.log(user);
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
      user_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { location_id, user_id } = req.body;

    const userExists = await User.findOne({ where: { id: user_id } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente!' });
    }

    const locationExists = await Location.findOne({
      where: { id: location_id },
    });

    if (!locationExists) {
      return res.status(400).json({ error: 'Localização não existente!' });
    }

    await Evaluation.create(req.body);
    return res.json({ success: 'Avaliação registrada com sucesso!' });
  }
}
export default new EvaluationController();
