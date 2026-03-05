import { FastifyPluginAsync } from 'fastify';
import creditRouter from './Credit/creditRouter';

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.register(creditRouter, { prefix: '/credit' });
};

export default routes;
