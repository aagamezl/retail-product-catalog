import type { FastifyInstance } from 'fastify'

export type Schema = {
  $id?: string
  type: string
  title: string
  description?: string
  required: string[]
  properties: Properties
  additionalProperties: boolean
}

export type Properties = {
  [key: string]: Record<string, unknown>
}

export type SchemaReference = {
  $ref: string
}

const schemas: Record<string, Schema[]> = {}

export const getSchemas = (domain: string) => {
  return schemas[domain]
}

export const registerSchema = (domain: string, id: string, schema: Schema) => {
  ;(schemas[domain] ??= []).push({
    $id: id,
    ...schema
  })
}

export const addSchemas = (app: FastifyInstance, domain: string) => {
  for (const schema of getSchemas(domain)) {
    app.addSchema(schema)
  }
}
