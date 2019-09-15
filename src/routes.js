import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import LocationController from './app/controllers/LocationController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/* Usuário */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/categories', CategoryController.index);
routes.get('/locations', LocationController.index);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/categories', CategoryController.store);
routes.put('/categories', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

routes.post('/locations', LocationController.store);
routes.put('/locations', LocationController.update);
routes.delete('/locations/:id', LocationController.delete);

/* Avaliações */
/* Listar, Inserir, Alterar, Excluir */

export default routes;
