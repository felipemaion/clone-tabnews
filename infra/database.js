import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    idleTimeoutMillis: 100,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    // Trate o erro aqui ou lance novamente para lidar em um nível superior
    throw new Error(`Erro ao executar a consulta: ${error.message}`);
  } finally {
    await client.end(); // Garante que a conexão seja sempre encerrada
  }
}

export default {
  query: query,
};
