import { omit, registerSchema } from '../../utils/schema'

export const ProductSchema = {
  title: 'Product',
  type: 'object',
  required: ['id', 'name', 'category', 'description', 'price', 'image'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Product unique identifier'
    },
    name: {
      type: 'string',
      minLength: 10,
      description: 'Name of the product'
    },
    category: {
      type: 'string',
      minLength: 5,
      description: 'Category of the product (e.g., Furniture, Kitchen, Storage)'
    },
    description: {
      type: 'string',
      minLength: 10,
      description: 'A short description of the product'
    },
    price: {
      type: 'number',
      minimum: 1,
      description: 'Price of the product in USD'
    },
    image: {
      type: 'string',
      format: 'uri',
      description: 'URL of the product image'
    }
  },
  additionalProperties: false
}

export const ProductPayloadSchema = omit(ProductSchema, ['id'])

export const ProductIdSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: ProductSchema.properties.id
  },
  additionalProperties: false
}

export const ProductPaginationSchema = {
  type: 'object',
  properties: {
    limit: {
      type: 'number',
      description: 'Number of products per page'
    },
    offset: {
      type: 'number',
      description: 'Number of page'
    }
  },
  additionalProperties: false
}

export const ProductSearchSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      description: 'Name of the product'
    }
  },
  additionalProperties: false
}

type SchemaProperty<T extends object> = {
  [K in keyof T]: T[K] extends { type: infer U } ? U : never
}

export type Product = SchemaProperty<typeof ProductSchema.properties>

export type ProductId = {
  id: SchemaProperty<typeof ProductSchema.properties>['id']
}

export type ProductPayload = Omit<Product, 'id'>

export type ProductPagination = {
  limit: number
  offset: number
}

export type ProductSearch = {
  name: string
}

registerSchema('products', 'Product', ProductSchema)
