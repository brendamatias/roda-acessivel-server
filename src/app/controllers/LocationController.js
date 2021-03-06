import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Location from '../models/Location';
import User from '../models/User';
import Address from '../models/Address';
import Category from '../models/Category';
import File from '../models/File';

class LocationController {
  async index(req, res) {
    if (req.params.id) {
      const location = await Location.findAll({
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
            model: Address,
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
            model: File,
            as: 'image',
            attributes: ['id', 'path', 'url'],
          },
        ],
        where: { id: req.params.id },
      });

      if (!location) {
        return res.status(404).json({
          error: 'Localidade não existente.',
        });
      }

      return res.json(location);
    }

    const { page = 1 } = req.query;

    const locations = await Location.findAll({
      order: ['id'],
      limit: 10,
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
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: Address,
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
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    let total = await Location.findAll();
    total = total.length;

    return res.json({ locations, total });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      image_id: Yup.number().required(),
      name: Yup.string().required(),
      category_id: Yup.number().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      zip_code: Yup.string()
        .required()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para criação de novas localizações.',
      });
    }

    const {
      name,
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
      category_id,
    } = req.body;

    const locationExists = await Location.findOne({
      where: { name },
    });

    if (locationExists) {
      return res.status(400).json({ error: 'Localização já cadastrada' });
    }

    const categoryExists = await Category.findOne({
      where: { id: category_id },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: 'Categoria não existente.' });
    }

    const addressExists = await Address.findOne({
      where: {
        number,
        zip_code,
      },
    });

    if (addressExists) {
      return res.status(400).json({ error: 'Endereço já cadastrado.' });
    }

    const { id: address_id } = await Address.create({
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
    });

    const { image_id } = req.body;

    const location = await Location.create({
      name,
      address_id,
      category_id,
      image_id,
    });

    return res.json(location);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      image_id: Yup.number(),
      name: Yup.string(),
      category_id: Yup.number(),
      zip_code: Yup.string()
        .min(8)
        .max(9),
      number: Yup.string().when('zip_code', (number, field) =>
        number ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error:
          'Você não tem permissão de administrador para alterar localidades.',
      });
    }

    const { id, name } = req.body;
    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(400).json({ error: 'Localidade não existente.' });
    }

    if (name && name !== location.name) {
      const locationExists = await Location.findOne({
        where: { name },
      });

      if (locationExists) {
        return res.status(400).json({ error: 'Localidade já existente.' });
      }
    }

    if (req.body.category_id) {
      const categoryExists = await Category.findOne({
        where: { id: req.body.category_id },
      });

      if (!categoryExists) {
        return res.status(400).json({ error: 'Categoria não existente.' });
      }
    }

    if (req.body.zip_code) {
      const addressExists = await Address.findOne({
        where: {
          number: req.body.number,
          zip_code: req.body.zip_code,
        },
      });

      if (addressExists) {
        return res.status(400).json({ error: 'Endereço já cadastrado.' });
      }

      const address = await Address.findByPk(location.address_id);

      const { street, number, neighborhood, city, state, zip_code } = req.body;

      const addressUpdate = await address.update({
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
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
    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res.status(401).json({
        error: 'Você não tem permissão para deletar localidades.',
      });
    }

    const location = await Location.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({
        error: 'Localidade não existente.',
      });
    }

    Location.destroy({
      where: { id: req.params.id },
    });

    return res
      .status(200)
      .json({ success: 'Localidade deletada com sucesso!' });
  }
}

export default new LocationController();
