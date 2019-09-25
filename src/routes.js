import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import LocationController from './app/controllers/LocationController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EvaluationController from './app/controllers/EvaluationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/* Usuário */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/categories', CategoryController.index);
routes.get('/locations', LocationController.index);
routes.get('/locations/:id', LocationController.index);
routes.get('/evaluations/:id', EvaluationController.index);

routes.get('/', (req, res) => res.send('ok'));

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/categories', CategoryController.store);
routes.put('/categories', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

routes.post('/locations', LocationController.store);
routes.put('/locations', LocationController.update);
routes.delete('/locations/:id', LocationController.delete);

routes.post('/evaluations', EvaluationController.store);

routes.post('/files', upload.single('file'), FileController.store);
/* Avaliações */
/* Listar, Inserir, Alterar, Excluir */

export default routes;
