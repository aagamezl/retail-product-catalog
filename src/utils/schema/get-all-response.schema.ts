import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import type { Schema, SchemaReference } from './schema-registry'
import { createSchema } from './create-schema'
import { ErrorResponseSchema } from './error-response.schema'

export const getAllResponseSchema = (schema: Schema | SchemaReference) => {
  return {
    [StatusCodes.OK]: createSchema(
      // schema,
      {
        title: 'Get Products Response',
        type: 'object',
        required: ['data', 'total'],
        properties: {
          data: {
            type: 'array',
            items: schema,
            description: 'Array of product objects'
          },
          total: {
            type: 'integer',
            minimum: 0,
            description: 'Total number of products available'
          }
        },
        additionalProperties: false
      },
      ReasonPhrases.OK
    ),
    ...ErrorResponseSchema
  }
}
