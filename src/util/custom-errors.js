/**
 * Method to show a validation exception
 * @param {String} message - User message
 * @throws {Exception} 400 exception
 */
const badRequest = (message) => {
  const error = new Error();
  error.developerMessage = 'Bad Request';
  error.userMessage = message;
  error.errorCode = 20032;
  error.statusCode = 400;
  throw error;
};

/**
 * Method to show the denied access exception
 * @param {String} message - User message
 * @throws {Exception} 401 exception
 */
const unauthorized = (message) => {
  const error = new Error();
  error.developerMessage = 'Unauthorized';
  error.userMessage = message;
  error.errorCode = 30001;
  error.statusCode = 401;
  throw error;
};

/**
 * Method to show a forbidden error message
 * @param {String} message - User message
 * @throws {Exception} 403 exception
 */
const forbidden = (message) => {
  const error = new Error();
  error.developerMessage = 'Forbidden';
  error.userMessage = message;
  error.errorCode = 30050;
  error.statusCode = 403;
  throw error;
};

/**
 * Method to show a not found exception
 * @param {String} message - User message
 * @throws {Exception} 404 exception
 */
const notFound = (message) => {
  const error = new Error();
  error.developerMessage = `${message} not found`;
  error.userMessage = `You attempted to get a ${message}, but did not find any`;
  error.errorCode = 20023;
  error.statusCode = 404;
  throw error;
};

/**
 * Method to show a internal server error message
 * @param {String} message - User message
 * @throws {Exception} 500 exception
 */
const internalServerError = (message) => {
  const error = new Error();
  error.developerMessage = 'Internal Server Error';
  error.userMessage = message;
  error.errorCode = 10001;
  error.statusCode = 500;
  throw error;
};

export const CustomErrors = {
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  internalServerError
};
