import { createRouter } from "next-connect";
import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import controller from "infra/controller.js";
const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

let dbClient;
const defaultMigrationsOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};
async function getHandler(request, response) {
  try {
    dbClient = await database.getNewClient();

    console.log("GET METHOD: ", request.body);
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dbClient: dbClient,
    });

    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient?.end();
  }
}

async function postHandler(request, response) {
  try {
    dbClient = await database.getNewClient();

    console.log("POST METHOD: ", request.body);
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
      dbClient: dbClient,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient?.end();
  }
}
