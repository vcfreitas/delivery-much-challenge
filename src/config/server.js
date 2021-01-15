'use strict';

import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Routes from '../routes.js';
import hpalDebug from 'hpal-debug';

const server = Hapi.server({
  port: 8000,
  host: 'localhost'
});

const init = async () => {
  const swaggerOptions = {
    info: {
      title: 'Delivery Much Challenge Api',
      version: '1.0.0'
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route(Routes);

  if (process.env.NODE_ENV !== 'production') {
    await server.register(hpalDebug);
  }

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

export default { init, server };
