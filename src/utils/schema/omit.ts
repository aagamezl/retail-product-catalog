export type Schema = {
  type: string
  title: string
  description: string
  properties: Properties
  required: string[]
  additionalProperties: boolean
}

export type Properties = {
  [key: string]: {
    type: string
    description: string
  }
}
export const omit = (schema: Schema, keys: string[]) => {
  const cloned = structuredClone(schema)

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
