import type { Schema } from './schema-registry'

export const pick = (schema: Schema, keys: string[]) => {
  return {
    title: schema.title,
    type: schema.type,
    required: schema.required.filter((property: string) =>
      keys.includes(property)
    ),
    properties: Object.entries(schema.properties).reduce(
      (properties: Record<string, unknown>, [property, definition]) => {
        if (keys.includes(property)) {
          properties[property] = definition
        }

        return properties
      },
      {}
    ),
    additionalProperties: schema.additionalProperties
  }
}
