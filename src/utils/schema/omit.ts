import type { Properties, Schema } from './schema-registry'

export const omit = (schema: Schema, keys: string[]) => {
  const cloned: Schema = structuredClone(schema)

  cloned.required = cloned.required.filter(
    (property: string) => !keys.includes(property)
  )

  cloned.properties = Object.entries(cloned.properties).reduce(
    (properties: Properties, [property, definition]) => {
      if (!keys.includes(property)) {
        properties[property] = definition
      }

      return properties
    },
    {}
  )

  return cloned
}
