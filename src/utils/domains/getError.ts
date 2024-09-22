import { FastifyError } from 'fastify'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export type ErrorType = {
  statusCode: number
  code: string
  error: string
  message: string
}

export const getError = (error: FastifyError): ErrorType => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    code: error.code,
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: error.message
  }
}
