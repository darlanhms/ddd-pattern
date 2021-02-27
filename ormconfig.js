const rootDir = process.env.NODE_ENV === 'production ' ?
  "dist/src" :
  "src";

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "mini-erp",
  synchronize: false,
  dropSchema: false,
  logging: false,
  entities: [rootDir + '/infra/database/TypeORM/entities/*.*'],
  migrations: [rootDir + '/infra/database/TypeORM/migrations/*.*'],
  subscribers: [rootDir + '/infra/database/TypeORM/subscribers/*.*'],
  cli: {
    migrationsDir: rootDir + '/infra/database/TypeORM/migrations'
  }
}
