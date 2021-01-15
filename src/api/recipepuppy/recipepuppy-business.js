'use strict';

import { CustomErrors } from '../../util/custom-errors.js';
import RecipePuppyServices from './recipepuppy-services.js';

/**
 * Business class to perform the recipe puppy
 */
export default class RecipePuppyBusiness {
  constructor () {
    this._service = new RecipePuppyServices();
  }

  /**
   * Method responsible for querying recipe in recipe puppy api
   * @param {String} ingredients - ingredients
   * @returns {Array} array recipes
   */
  async getList (ingredients) {
    try {
      const response = await this._service.getList(ingredients);
      return response.data.results;
    } catch (error) {
      CustomErrors.internalServerError('Unavailable service recipe puppy');
    }
  }
}
