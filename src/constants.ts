export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Sorry, you do not have access to this resource",
  GENERIC_MESSAGE: "Sorry, an error occurred",
  USER_NOT_FOUND: "Sorry, user not found",
  USER_EXISTS_WITH_EMAIL_OR_USERNAME: "Sorry, user already exists",
  USER_EXISTS_WITH_USERNAME: "Sorry, username already exists",
  USER_EXISTS_WITH_EMAIL: "Sorry, email already exists",
  PROFILE_UPDATE_FAILED: "Sorry, profile update failed",
  INVALID_OTP: "Invalid/Expired OTP Entered",
  TOKEN_EXPIRED: "Sorry, this token is expired or invalid",
  NOT_AUTHORIZED: "Sorry, you are not authorized!",
  NOT_AUTHENTICATED: "Sorry, you are not authenticated!",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INVALID_IDENTIFIER: "Invalid Identifier Received",
  INVALID_PAYLOAD: "Invalid payload",
};

export const ENVIRONMENTS = {
  local: "local",
  development: "development",
  staging: "staging",
  production: "production",
};

export const DEFAULT_PORT = 4500;

export const HTTP_STATUS_CODE = {
  200: {
    code: 200,
    name: "OK",
    meaning: "The request has succeeded.",
  },
  201: {
    code: 201,
    name: "Created",
    meaning:
      "The request has been fulfilled and has resulted in one or more new resources being created.",
  },
  204: {
    code: 204,
    name: "No Content",
    meaning:
      "The server successfully processed the request and is not returning any content.",
  },
  400: {
    code: 400,
    name: "Bad Request",
    meaning:
      "The server cannot or will not process the request due to an apparent client error.",
  },
  401: {
    code: 401,
    name: "Unauthorized",
    meaning:
      "The request has not been applied because it lacks valid authentication credentials for the target resource.",
  },
  403: {
    code: 403,
    name: "Forbidden",
    meaning:
      "The server understood the request, but it is refusing to fulfill it.",
  },
  404: {
    code: 404,
    name: "Not Found",
    meaning: "The server cannot find the requested resource.",
  },
  405: {
    code: 405,
    name: "Method Not Allowed",
    meaning:
      "The method received in the request-line is known by the origin server but not supported by the target resource.",
  },
  500: {
    code: 500,
    name: "Internal Server Error",
    meaning:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  503: {
    code: 503,
    name: "Service Unavailable",
    meaning:
      "The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
  },
};

export const HTTP_STATUS_CODES = {
  200: {
    code: 200,
    name: "OK",
    meaning: "The request has succeeded.",
  },
  201: {
    code: 201,
    name: "Created",
    meaning:
      "The request has been fulfilled and has resulted in one or more new resources being created.",
  },
  204: {
    code: 204,
    name: "No Content",
    meaning:
      "The server successfully processed the request and is not returning any content.",
  },
  400: {
    code: 400,
    name: "Bad Request",
    meaning:
      "The server cannot or will not process the request due to an apparent client error.",
  },
  401: {
    code: 401,
    name: "Unauthorized",
    meaning:
      "The request has not been applied because it lacks valid authentication credentials for the target resource.",
  },
  403: {
    code: 403,
    name: "Forbidden",
    meaning:
      "The server understood the request, but it is refusing to fulfill it.",
  },
  404: {
    code: 404,
    name: "Not Found",
    meaning: "The server cannot find the requested resource.",
  },
  405: {
    code: 405,
    name: "Method Not Allowed",
    meaning:
      "The method received in the request-line is known by the origin server but not supported by the target resource.",
  },
  500: {
    code: 500,
    name: "Internal Server Error",
    meaning:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  503: {
    code: 503,
    name: "Service Unavailable",
    meaning:
      "The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
  },
};
