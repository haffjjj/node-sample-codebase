class customError extends Error{
  constructor(message, detail = {}){
    super(message)
    this.message = message
    this.detail = detail
  }
}

const message = {  
  badRequest: "The API request is invalid or improperly formed. Consequently, the API server could not understand the request.",
  invalid: "The request failed because it contained an invalid value. The value could be a parameter value, a header value, or a property value.",
  duplicate: "The request failed because it contained a duplicate value",
  unauthorized: "The user is not authorized to make the request.",
  forbidden: "The requested operation is forbidden and cannot be completed.",
  rateLimitExceeded: "Too many requests have been sent within a given time span.",
  notFound: "The requested operation failed because a resource associated with the request could not be found.",
  uploadTooLarge: "The request failed because the data sent in the request is too large.",
  internalError: "The request failed due to an internal error."
}

const getStatusCode = (errMessage) => {
  let code 
  switch (errMessage) {
    case message.badRequest :
      code = 400
      break
    case message.invalid :
      code = 400
      break
    case message.unauthorized :
      code = 401
      break
    case message.forbidden :
      code = 403
      break
    case message.rateLimitExceeded :
      break
    case message.notFound :
      code = 404
      break
    case message.uploadTooLarge :
      code = 413
      break
    case message.duplicate :
      code = 409
      break
    default:
      code = 500
      break
  }

  return code
}

export default {
  new: customError,
  message: message,
  getStatusCode: getStatusCode
}