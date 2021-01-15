/**
 * @jest-environment node
 */
/* global, expect, test, beforeAll, afterAll */
'use strict';

import _ from 'lodash';
import nock from 'nock';
import srv from '../../src/config/server.js';
import MockRecipePuppy from '../mocks/mock-recipepuppy.json';
import MockGiphy from '../mocks/mock-giphy.json';

srv.init();
const server = srv.server;

beforeAll((done) => {
  server.events.on('start', () => {
    done();
  });
  nock.cleanAll();
  nock.disableNetConnect();
});

afterAll((done) => {
  server.events.on('stop', () => {
    done();
  });
  server.stop();
});

describe('GET /', () => {
  test('should return 400 when parameter not informed', async () => {
    const options = {
      method: 'GET',
      url: '/recipes/'
    };
    const response = await server.inject(options);
    expect(response.statusCode).toBe(400);
    expect(response.statusMessage).toBe('Bad Request');
  });

  test('should return 400 when more than 3 ingredients are informed', async () => {
    const options = {
      method: 'GET',
      url: '/recipes/?i=onion,tomato,cheese,olive'
    };

    const response = await server.inject(options);
    expect(response.statusCode).toBe(400);
    expect(response.statusMessage).toBe('Bad Request');
    expect(response.payload).toBe('Maximum amount of ingredients exceeded (3)');
  });

  test('should return 404 when recipes not found', async () => {
    const _mockRecipePuppy = _.cloneDeep(MockRecipePuppy);
    _mockRecipePuppy.results = [];

    nock('http://www.recipepuppy.com')
      .get('/api/?i=onion')
      .reply(200, _mockRecipePuppy);

    const options = {
      method: 'GET',
      url: '/recipes/?i=onion'
    };
    const response = await server.inject(options);
    expect(response.statusCode).toBe(404);
    expect(response.statusMessage).toBe('Not Found');
    expect(response.payload).toBe(
      'You attempted to get a recipe, but did not find any'
    );
  });

  test('should return 500 when recipe puppy service is not available', async () => {
    nock('http://www.recipepuppy.com').get('/api/?i=onion').reply(500, {});

    const options = {
      method: 'GET',
      url: '/recipes/?i=onion'
    };
    const response = await server.inject(options);
    expect(response.statusCode).toBe(500);
    expect(response.statusMessage).toBe('Internal Server Error');
    expect(response.payload).toBe('Unavailable service recipe puppy');
  });

  test('should return 500 when giphy service is not available', async () => {
    nock('http://www.recipepuppy.com')
      .get('/api/?i=tomato')
      .reply(200, MockRecipePuppy);

    nock('http://api.giphy.com')
      .get('/v1/gifs/search?q=Steamed Mussels I&api_key=pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98&limit=1')
      .reply(500, {});

    const options = {
      method: 'GET',
      url: '/recipes/?i=tomato'
    };
    const response = await server.inject(options);
    expect(response.statusCode).toBe(500);
    expect(response.statusMessage).toBe('Internal Server Error');
    expect(response.payload).toBe('Unavailable service giphy');
  });

  test('should return 200 because external APIs successfully registered', async () => {
    nock('http://www.recipepuppy.com')
      .get('/api/?i=tomato')
      .reply(200, MockRecipePuppy);

    nock('http://api.giphy.com')
      .get('/v1/gifs/search?q=Steamed Mussels I&api_key=pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98&limit=1')
      .reply(200, MockGiphy);

    const options = {
      method: 'GET',
      url: '/recipes/?i=tomato'
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
  });
});
