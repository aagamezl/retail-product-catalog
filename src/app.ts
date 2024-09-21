import fastify from 'fastify'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import { getReasonPhrase } from 'http-status-codes'

import { definition } from './open-api/definition'

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  reply.status(Number(error.statusCode)).send({
    statusCode: error.statusCode,
    code: error.code,
    error: getReasonPhrase(Number(error.statusCode)),
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
  return await { status: true }
})

app.register(Swagger, definition)

app.register(SwaggerUI)
