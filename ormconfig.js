const env = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  url: process.env.DATABASE_URL || undefined,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  port: 5431,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/src/entities/**/*.js"]
      : ["src/entities/**/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/database/migration/**/*.js"]
      : ["src/database/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migration",
  },
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["src/entities/**/*.ts"],
  synchronize: true,
};

module.exports = process.env.NODE_ENV === "test" ? testEnv : env;
