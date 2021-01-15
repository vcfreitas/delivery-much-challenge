'use strict';

import _ from 'lodash';
import GiphyBusiness from '../giphy/giphy-business.js';
import RecipePuppyBusiness from '../recipepuppy/recipepuppy-business.js';
import { CustomErrors } from '../../util/custom-errors.js';

export default class RecipeBusiness {
  /**
   * Class constructor
   */
  constructor () {
    this._giphyBusiness = new GiphyBusiness();
    this._recipePuppyBusiness = new RecipePuppyBusiness();
  }

  /**
   * Method responsible for consulting recipes
   * @param {String} ingredients - Ingredients
   * @returns {Object} return object payload
   */
  async getList (ingredients) {
    const keywords = ingredients.split(',');

    if (keywords.length > 3) {
      throw CustomErrors.badRequest('Maximum amount of ingredients exceeded (3)');
    }

    const recipePuppy = await this._recipePuppyBusiness.getList(ingredients);

    if (recipePuppy.length === 0) {
      CustomErrors.notFound('recipe');
    }

    const recipes = [];
    for (const item of recipePuppy) {
      const gif = await this._giphyBusiness.getGiphyGif(item.title);
      item.gif = gif;

      recipes.push(this.buildRecipe(item));
    }

    return {
      keywords,
      recipes
    };
  }

  /**
   * Method responsible for building the response
   * @param {Object} recipe - recipe object
   * @returns {Object} formatted recipe
   */
  buildRecipe (recipe) {
    let ingredients = recipe.ingredients.split(',');
    ingredients = _.map(ingredients, _.trim);

    const response = {
      title: recipe.title,
      ingredients: _.orderBy(ingredients),
      link: recipe.href,
      gif: recipe.gif
    };

    return response;
  }
}
