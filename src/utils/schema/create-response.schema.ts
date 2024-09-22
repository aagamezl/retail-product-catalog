import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import type { Schema, SchemaReference } from './schema-registry'
import { ErrorResponseSchema } from './error-response.schema'
import { createSchema } from './create-schema'

export const createResponseSchema = (schema: Schema | SchemaReference) => {
  return {
    [StatusCodes.CREATED]: createSchema(schema, ReasonPhrases.CREATED),
    ...ErrorResponseSchema
  }
}
