import fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import routes from './routes';

const port = parseInt(process.env.PORT || '5000', 10);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const buildServer = () => {
  const app = fastify({
    logger: false,
    bodyLimit: 10 * 1024,
  });

  app.register(helmet, {
    contentSecurityPolicy: false,
  });

  app.register(cors, {
    methods: ['GET'],
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy violation'), false);
    },
  });

  app.register(rateLimit, {
    global: false,
    max: 120,
    timeWindow: '1 minute',
    errorResponseBuilder: () => {
      return {
        error: {
          errorCode: 3,
          message: 'Too many requests',
        },
      };
    },
  });

  app.register(async (instance) => {
    instance.register(rateLimit, {
      max: 120,
      timeWindow: '1 minute',
    });

    instance.register(routes, { prefix: '/api' });
  });

  app.get('/health', async (_request, reply) => {
    return reply.code(200).send('healthy');
  });

  app.setNotFoundHandler(async (_request, reply) => {
    return reply.code(404).send('Not Found');
  });

  app.setErrorHandler(async (error, _request, reply) => {
    if (error.message === 'CORS policy violation') {
      return reply.code(403).send({ error: { errorCode: 3, message: 'Origin is not allowed' } });
    }

    return reply.code(500).send({ error: { errorCode: 3, message: 'Internal server error' } });
  });

  return app;
};

const start = async () => {
  const app = buildServer();
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server started on port ${port}`);
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}
