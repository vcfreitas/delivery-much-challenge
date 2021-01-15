'use strict';

import HTTPStatus from 'http-status';
import RecipeBusiness from './recipe-business.js';

class RecipeController {
  /**
   * Method responsible for fetching receipts
   * @param {Object} request - Object with request data
   * @returns {Object} reply return payload object
   */
  async getList (request, reply) {
    const business = new RecipeBusiness();

    try {
      const result = await business.getList(request.query.i);
      return reply.response(result).code(HTTPStatus.OK);
    } catch (error) {
      return reply.response(error.userMessage).code(error.statusCode);
    }
  }
}

export default RecipeController;
