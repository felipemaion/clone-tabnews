export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu", {
      cause,
    });
    this.name = "InternalServerError";
    this.statusCode = statusCode || 500;
    this.action = "Entre em contato com o suporte.";
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento.", {
      cause,
    });
    this.name = "ServiceError";
    this.statusCode = 503;
    this.action = "Verifique se o serviço está disponível.";
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para esse endpoint.");
    this.name = "MethodNotAllowedError";
    this.statusCode = 405;
    this.action =
      "Verifique se o método HTTP enviado é válido para este endpoint.";
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
