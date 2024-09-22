import fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import csrfProtection from '@fastify/csrf-protection'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { definition } from './open-api/definition'
import { routes as productsRoutes } from './domains/products/products.routes'

import { config } from '../config'

export const app = fastify()

// Response compression
app.register(fastifyCompress, config.compression)

// Security measures
app.register(csrfProtection)
app.register(helmet)
app.register(cors)

app.setErrorHandler((error, _, reply) => {
  console.log(error)
  const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR

  reply.status(statusCode).send({
    statusCode: statusCode,
    code: error.code ?? null,
    error: getReasonPhrase(statusCode),
    message: error.message
  })
})

const healthCheckSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'boolean' }
      }
    }
  }
}

app.get('/health/check', { schema: healthCheckSchema }, async () => {
  return { status: true }
})

app.register(Swagger, definition)

app.register(SwaggerUI)

app.register(productsRoutes)
