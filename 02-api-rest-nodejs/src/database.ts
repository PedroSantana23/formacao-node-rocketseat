import type { Knex } from "knex"
import knex from 'knex'
import { env } from "./env"

const isPostgres = env.DATABASE_CLIENT !== 'sqlite'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === 'sqlite'
    ? { filename: env.DATABASE_URL }
    : {
        connectionString: env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // 👈 obrigatório no Render
      },
  useNullAsDefault: true,
  migrations: {
    extension: isPostgres ? 'js' : 'ts', // 👈 js em produção
    directory: './db/migrations',
  },
}

export const build = knex(config)