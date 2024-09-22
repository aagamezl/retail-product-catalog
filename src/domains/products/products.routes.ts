import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import type {
  ProductPayload,
  ProductPagination,
  ProductId,
  ProductSearch
} from './products.schema'
import * as controller from './products.controller'
import { validations } from './products.validations'
import { addSchemas } from '../../utils/schema'

export const routes = async (fastify: FastifyInstance) => {
  addSchemas(fastify, 'products')

  fastify.get(
    '/products',
    { schema: { ...validations.getAll, tags: ['Products'] } },
    async (
      request: FastifyRequest<{ Querystring: ProductPagination }>,
      reply: FastifyReply
    ) => {
      return controller.getAll(request, reply)
    }
  )

  fastify.get(
    '/products/:id',
    { schema: { ...validations.getById, tags: ['Products'] } },
    async (
      request: FastifyRequest<{ Params: ProductId }>,
      reply: FastifyReply
    ) => {
      return controller.getById(request, reply)
    }
  )

  fastify.get(
    '/search',
    { schema: { ...validations.search, tags: ['Products'] } },
    async (
      request: FastifyRequest<{ Querystring: ProductSearch }>,
      reply: FastifyReply
    ) => {
      return controller.search(request, reply)
    }
  )

  fastify.post(
    '/products',
    { schema: { ...validations.create, tags: ['Products'] } },
    async (
      request: FastifyRequest<{ Body: ProductPayload }>,
      reply: FastifyReply
    ) => {
      return controller.create(request, reply)
    }
  )
}
