import { join } from 'node:path'

export type SearchConfig = {
  distance: number
  similarity: number
}

export type Compression = {
  global: boolean
}

export type Config = {
  database: string
  port: number
  host: string
  pageSize: number
  search: SearchConfig
  compression: Compression
}

export const config: Config = {
  database: join(process.cwd(), 'database'),
  port: 3000,
  host: '0.0.0.0',
  pageSize: 50,
  search: {
    distance: 3,
    similarity: 80
  },
  compression: { global: false }
}
