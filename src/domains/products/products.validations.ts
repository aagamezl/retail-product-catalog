import { REQUEST_SEGMENTS } from '../../utils'

import {
  ProductPayloadSchema,
  ProductPaginationSchema,
  ProductIdSchema,
  ProductSearchSchema
} from './products.schema'
import {
  createResponseSchema,
  getAllResponseSchema,
  getByIdResponseSchema
} from '../../utils/schema'

export const validations = {
  // POST /products
  create: {
    [REQUEST_SEGMENTS.BODY]: ProductPayloadSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createResponseSchema({ $ref: 'Product' })
  },
  // DELETE /products/:id
  getAll: {
    [REQUEST_SEGMENTS.QUERY]: ProductPaginationSchema,
    [REQUEST_SEGMENTS.RESPONSE]: getAllResponseSchema({ $ref: 'Product' })
  },
  // GET /products/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: ProductIdSchema,
    [REQUEST_SEGMENTS.RESPONSE]: getByIdResponseSchema({ $ref: 'Product' })
  },
  // GET /search?name
  search: {
    [REQUEST_SEGMENTS.QUERY]: ProductSearchSchema,
    //[REQUEST_SEGMENTS.RESPONSE]: getByIdResponseSchema({ $ref: 'Product' })
    [REQUEST_SEGMENTS.RESPONSE]: getAllResponseSchema({ $ref: 'Product' })
  }
}
