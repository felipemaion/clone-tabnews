import { Client } from "pg";
import { ServiceError } from "infra/errors.js";
let client;
async function query(queryObject) {
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceError = new ServiceError({
      message: "Erro na conexão com o Banco ou na Query.",
      cause: error,
    });
    throw serviceError;
  } finally {
    await client?.end(); // Garante que a conexão seja sempre encerrada
  }
}
async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    idleTimeoutMillis: 100,
    ssl: getSSL(),
  });
  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};
export default database;

function getSSL() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
