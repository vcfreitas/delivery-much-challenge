'use strict';

import Fs from 'fs';
import Path from 'path';
import Dotenv from 'dotenv';
const __dirname = Path.resolve();

const initEnvVariables = () => {
  // Set default node environment to development
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const envPath = process.env.NODE_ENV === 'test' ? Path.join(__dirname, '/test/.env') : Path.join(__dirname, '.env');

  try {
    Fs.statSync(envPath);
    Dotenv.config({ path: envPath });
  } catch (err) { console.log(envPath + ' not found, load by environment variables'); }
};
initEnvVariables();

// All configurations will extend these options
// ============================================
const all = {
  recipepuppy: {
    url: process.env.RECIPE_PUPPY_URL,
    timeout: process.env.RECIPE_PUPPY_TIMEOUT
  },
  giphy: {
    url: process.env.GIPHY_URL,
    token: process.env.GIPHY_TOKEN,
    limit: process.env.GIPHY_LIMIT,
    timeout: process.env.GIPHY_TIMEOUT
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
export default all;
