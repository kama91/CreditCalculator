import { FastifyPluginAsync } from 'fastify';
import CreditController from './CreditController';

const controller = new CreditController();

const creditRouter: FastifyPluginAsync = async (fastify) => {
    fastify.get('/detail', async (request, reply) => {
        const query = request.query as Record<string, string | string[] | undefined>;
        const result = controller.getCreditPayments(query);
        return reply.code(result.statusCode).send(result.payload);
    });
};

export default creditRouter;
