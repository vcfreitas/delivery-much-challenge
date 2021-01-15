'use strict';

import axios from 'axios';
import Config from '../../config/environment/index.js';

/**
 * Service class to perform the recipe puppy
 */
export default class RecipePuppyServices {
  /**
   * Method responsible for consulting recipes in recipe puppy api
   * @param {String} ingredients - ingredients
   * @returns {Object} return object payload
   */
  async getList (ingredients) {
    const url = `${Config.recipepuppy.url}?i=${ingredients}`;
    return axios.get(url, { timeout: Config.recipepuppy.timeout });
  }
}
