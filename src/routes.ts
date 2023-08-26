import { Router } from 'express';
import { UserController } from './controllers/UserController';

const routes = Router();

routes.post('/user', new UserController().create);
routes.get('/user', new UserController().get);
routes.get('/user/:id', new UserController().show);
routes.put('/user/:id', new UserController().update);
routes.patch('/user/:id', new UserController().inactive);

export default routes;
