import Router from 'express';
import CreditController from './CreditController';

const creditRouter = Router();

creditRouter.get('/detail', new CreditController().getCreditPayments);

export default creditRouter;