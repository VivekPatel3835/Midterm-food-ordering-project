require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_DB_HOST,
      user: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASS,
      database: process.env.POSTGRES_DB_NAME,
      port: process.env.POSTGRES_DB_PORT,
      ssl: process.env.POSTGRES_DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.POSTGRES_DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
