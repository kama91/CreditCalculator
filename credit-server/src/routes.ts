import Router from 'express';
import creditRouter from './Credit/creditRouter';

const routes = Router();

routes.use('/credit', creditRouter);

export default routes;