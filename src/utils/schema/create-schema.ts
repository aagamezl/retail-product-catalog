import type { Schema, SchemaReference } from './schema-registry'

export const createSchema = (
  schema: Schema | SchemaReference,
  description: string
) => {
  return Object.assign({}, schema, { description })
}
