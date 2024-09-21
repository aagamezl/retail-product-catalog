import { join } from 'node:path'

export type Config = {
  database: string
  port: number
  host: string
}

export const config: Config = {
  database: join(process.cwd(), 'database'),
  port: 3000,
  host: '0.0.0.0'
}
