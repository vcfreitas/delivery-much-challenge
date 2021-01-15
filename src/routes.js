'use strict';

import Joi from 'joi';
import RecipeController from './api/recipe/recipe-controller.js';

const recipeController = new RecipeController();

const routes = [
  {
    method: 'GET',
    path: '/recipes/',
    options: {
      handler: recipeController.getList,
      description: 'Route responsible for returning recipes and ingredients',
      notes: 'Returns list recipes',
      tags: ['api'],
      validate: {
        query: Joi.object({
          i: Joi.string().description('Recipe ingredients').example('onion,tomato').required()
        })
      },
      response: {
        schema: Joi.object({
          keywords: Joi.array().items(
            Joi.string().description('Keywords ingredient').example(['onion', 'tomato']).required()
          ).required(),
          recipes: Joi.array().items({
            title: Joi.string().description('Recipe title').example('Greek Omelet with Feta').required(),
            ingredients: Joi.array().items(
              Joi.string().description('Ingredient').example(['eggs', 'feta cheese', 'garlic', 'red onions', 'spinach', 'tomato', 'water']).required()
            ),
            link: Joi.string().description('Recipe link').example('http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx').required(),
            gif: Joi.string().description('Recipe gif').example('https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif').required()
          }).required()
        }).required()
      }
    }
  }
];

export default routes;
