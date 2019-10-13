import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Category from '../models/Category';
import User from '../models/User';
import Location from '../models/Location';
import File from '../models/File';

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll();

    if (req.params.id) {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({
          error: 'Categoria não existente.',
        });
      }

      const { page = 1 } = req.query;

      const location = await Location.findAll({
        order: ['id'],
        limit: 4,
        offset: (page - 1) * 4,
        attributes: [
          'id',
          'name',
          [
            Sequelize.literal(
              `(SELECT (sum("entry_note")/count(*))
              FROM "evaluations"
              WHERE "location_id" = "Location"."id")`
            ),
            `entry_note`,
          ],
          [
            Sequelize.literal(
              `(SELECT (sum("parking_note")/count(*))
              FROM "evaluations"
              WHERE "location_id" = "Location"."id")`
            ),
            `parking_note`,
          ],
          [
            Sequelize.literal(
              `(SELECT (sum("circulation_note")/count(*))
              FROM "evaluations"
              WHERE "location_id" = "Location"."id")`
            ),
            `circulation_note`,
          ],
          [
            Sequelize.literal(
              `(SELECT (sum("bathroom_note")/count(*))
              FROM "evaluations"
              WHERE "location_id" = "Location"."id")`
            ),
            `bathroom_note`,
          ],
        ],
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['id', 'path', 'url'],
          },
        ],
        where: { category_id: req.params.id },
      });

      return res.json(location);
    }

    return res.json(categories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para criação de novas categorias.',
      });
    }

    const categoryExists = await Category.findOne({
      where: { name: req.body.name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Categoria já existente.' });
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
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para alterar categorias.',
      });
    }

    const { id, name } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(400).json({ error: 'Categoria não existente.' });
    }

    if (name && name !== category.name) {
      const categoryExists = await Category.findOne({
        where: { name },
      });

      if (categoryExists) {
        return res.status(400).json({ error: 'Categoria já existente.' });
      }
    }

    const categoryUpdate = await category.update(req.body);

    return res.json({
      categoryUpdate,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error: 'Você não tem permissão para deletar categorias.',
      });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: 'Categoria não existente.',
      });
    }

    Category.destroy({
      where: { id: req.params.id },
    });

    return res.status(200).json({ success: 'Categoria deletada com sucesso!' });
  }
}

export default new CategoryController();
