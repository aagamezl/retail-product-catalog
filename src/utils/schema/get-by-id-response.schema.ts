import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import type { Schema, SchemaReference } from './schema-registry'
import { createSchema } from './create-schema'
import { ErrorByIdResponseSchema } from './error-by-id-response.schema'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
export const getByIdResponseSchema = (schema: Schema | SchemaReference) => {
  return {
    [StatusCodes.OK]: createSchema(schema, ReasonPhrases.OK),
    ...ErrorByIdResponseSchema
  }
}

export default getByIdResponseSchema
