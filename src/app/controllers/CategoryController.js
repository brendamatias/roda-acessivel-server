import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const categoryExists = await Category.findOne({
      where: { name: req.body.name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const { id, name } = await Category.create(req.body);

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

    const { id, name } = req.body;
    const category = await Category.findByPk(id);

    if (name && name !== category.name) {
      const categoryExists = await Category.findOne({
        where: { name },
      });

      if (categoryExists) {
        return res.status(400).json({ error: 'Category already exists' });
      }
    }
    const categoryUpdate = await category.update(req.body);

    return res.json({
      categoryUpdate,
    });
  }
}

export default new CategoryController();
