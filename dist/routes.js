"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _CategoryController = require('./app/controllers/CategoryController'); var _CategoryController2 = _interopRequireDefault(_CategoryController);
var _LocationController = require('./app/controllers/LocationController'); var _LocationController2 = _interopRequireDefault(_LocationController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _EvaluationController = require('./app/controllers/EvaluationController'); var _EvaluationController2 = _interopRequireDefault(_EvaluationController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

/* Usuário */
routes.get('/users', _UserController2.default.index);
routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.get('/categories', _CategoryController2.default.index);
routes.get('/locations', _LocationController2.default.index);
routes.get('/locations/:id', _LocationController2.default.index);
routes.get('/evaluations/:id', _EvaluationController2.default.index);

routes.use(_auth2.default);
routes.put('/users', _UserController2.default.update);
routes.post('/categories', _CategoryController2.default.store);
routes.put('/categories', _CategoryController2.default.update);
routes.delete('/categories/:id', _CategoryController2.default.delete);

routes.post('/locations', _LocationController2.default.store);
routes.put('/locations', _LocationController2.default.update);
routes.delete('/locations/:id', _LocationController2.default.delete);

routes.post('/evaluations', _EvaluationController2.default.store);

routes.post('/files', upload.single('file'), _FileController2.default.store);
/* Avaliações */
/* Listar, Inserir, Alterar, Excluir */

exports. default = routes;
