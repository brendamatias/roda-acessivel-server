import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/* RETIRAR TODOS OS COMENTÁRIOS LISTADOS!!!! */
/* Usuário */
/* Excluir */
routes.get('/users', UserController.index); /* Listar OK */
routes.post('/users', UserController.store); /* Inserir OK */
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update); /* Alterar OK */

/* Categorias */
/* Listar, Inserir, Alterar, Excluir */
/* Locais */
/* Listar, Inserir, Alterar, Excluir */
/* Avaliações */
/* Listar, Inserir, Alterar, Excluir */

export default routes;
