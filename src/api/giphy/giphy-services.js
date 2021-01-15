'use strict';

import axios from 'axios';
import Config from '../../config/environment/index.js';

/**
 * Service class to perform the giphy
 */
export default class GiphyServices {
  /**
   * Method responsible for querying gif in giphy api
   * @param {String} recipeTitle - recipe title
   * @returns {Object} object payload
   */
  async getGiphyGif (recipeTitle) {
    const token = Config.giphy.token;
    const limit = Config.giphy.limit;
    const url = `${Config.giphy.url}?q=${recipeTitle}&api_key=${token}&limit=${limit}`;
    return axios.get(url, { timeout: Config.giphy.timeout });
  }
}
