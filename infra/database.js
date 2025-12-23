import { Client } from "pg";
let client;
async function query(queryObject) {
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    // Trate o erro aqui ou lance novamente para lidar em um nível superior
    throw new Error(`Erro ao executar a consulta: ${error.message}`);
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
