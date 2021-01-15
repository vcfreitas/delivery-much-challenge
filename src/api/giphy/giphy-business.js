'use strict';

import { CustomErrors } from '../../util/custom-errors.js';
import GiphyServices from './giphy-services.js';

/**
 * Business class to perform the giphy
 */
export default class GiphyBusiness {
  /**
   * Class constructor
   */
  constructor () {
    this._service = new GiphyServices();
  }

  /**
   * Method responsible for querying gif in giphy api
   * @param {String} recipeTitle - recipe title
   * @returns {Object} object payload
   */
  async getGiphyGif (recipeTitle) {
    try {
      const response = await this._service.getGiphyGif(recipeTitle);
      return response.data.data[0].url;
    } catch (error) {
      CustomErrors.internalServerError('Unavailable service giphy');
    }
  }
}
