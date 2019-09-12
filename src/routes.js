import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/* RETIRAR TODOS OS COMENTÁRIOS LISTADOS!!!! */
/* Usuário */
/* Excluir */
routes.get('/users', UserController.index); /* Listar OK */
routes.post('/users', UserController.store); /* Inserir OK */
routes.post('/sessions', SessionController.store);

/* Categorias */
routes.get('/categories', CategoryController.index); /* Listar OK */

routes.use(authMiddleware);
routes.put('/users', UserController.update); /* Alterar OK */

routes.post('/categories', CategoryController.store);
routes.put('/categories', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

/* Locais */
/* Listar, Inserir, Alterar, Excluir */
/* Avaliações */
/* Listar, Inserir, Alterar, Excluir */

export default routes;
