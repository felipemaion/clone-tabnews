import { InternalServerError, MethodNotAllowedError } from "infra/errors";

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.error(publicErrorObject);
  //throw new InternalServerError(error);
  response.status(publicErrorObject.statusCode).json({
    error: publicErrorObject,
  });
}

function onNonMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNonMatchHandler,
    onError: onErrorHandler,
  },
};
export default controller;
