import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

import type {
  Product,
  ProductPagination,
  ProductPayload,
  ProductSearch
} from './products.schema'
import { config } from '../../../config'
import { fuzzySearch } from '../../utils/fuzzySearch'

type GetAllResponse = {
  data: Product[]
  total: number
}

const collection = 'products.json'

const create = async (payload: ProductPayload): Promise<Product> => {
  const databasePath = join(config.database, collection)

  const data = await readFile(databasePath, { encoding: 'utf-8' })
  const products: Product[] = JSON.parse(data)
  const product = {
    id: randomUUID(),
    ...payload
  }

  products.push(product)

  await writeFile(databasePath, JSON.stringify(products, null, 2), {
    encoding: 'utf-8'
  })

  return product
}

const getAll = async (filters: ProductPagination): Promise<GetAllResponse> => {
  const databasePath = join(config.database, collection)

  const data = await readFile(databasePath, { encoding: 'utf-8' })
  const products: Product[] = JSON.parse(data)

  const startIndex = filters.offset ?? 0
  const endIndex = startIndex + (filters.limit ?? config.pageSize)

  return {
    data: products.slice(startIndex, endIndex),
    total: products.length
  }
}

const getById = async (id: string): Promise<Product | undefined> => {
  const databasePath = join(config.database, collection)

  const data = await readFile(databasePath, { encoding: 'utf-8' })
  const products: Product[] = JSON.parse(data)

  return products.find(product => product.id === id)
}

const search = async (search: ProductSearch): Promise<GetAllResponse> => {
  const databasePath = join(config.database, collection)

  const data = await readFile(databasePath, { encoding: 'utf-8' })
  const products: Product[] = JSON.parse(data)

  const matches = fuzzySearch(products, search.name, config.search)

  return {
    data: matches,
    total: products.length
  }
}

export const model = {
  create,
  getAll,
  getById,
  search
}
