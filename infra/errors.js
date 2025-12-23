export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu", {
      cause,
    });
    this.name = "InternalServerError";
    (this.statusCode = 500), (this.action = "Entre em contato com o suporte.");
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
