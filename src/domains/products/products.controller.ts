import { StatusCodes } from 'http-status-codes'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

import type {
  ProductId,
  ProductPagination,
  ProductPayload,
  ProductSearch
} from './products.schema'

import { Logger } from '../../utils/logger'
import { ErrorType, getError } from '../../utils'
import { CONTENT_TYPE } from '../../utils/constants'

import { model } from './products.model'

const create = async (
  request: FastifyRequest<{ Body: ProductPayload }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const record = await model.create(request.body)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(StatusCodes.CREATED)
      .send(record)
  } catch (error) {
    const UnexpectedError = error as FastifyError
    const returnError: ErrorType = getError(UnexpectedError)

    Logger.error(UnexpectedError.message)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(returnError.statusCode)
      .send(returnError)
  }
}

const getAll = async (
  request: FastifyRequest<{ Querystring: ProductPagination }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const records = await model.getAll(request.query)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(StatusCodes.OK)
      .send(records)
  } catch (error) {
    const UnexpectedError = error as FastifyError
    const returnError: ErrorType = getError(UnexpectedError)

    console.log(returnError)

    Logger.error(UnexpectedError.message)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(returnError.statusCode)
      .send(returnError)
  }
}

const getById = async (
  request: FastifyRequest<{ Params: ProductId }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const product = await model.getById(request.params.id)

    if (!product) {
      return reply
        .header('Content-Type', CONTENT_TYPE)
        .status(StatusCodes.NOT_FOUND)
        .send()
    }

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(StatusCodes.OK)
      .send(product)
  } catch (error) {
    const UnexpectedError = error as FastifyError
    const returnError: ErrorType = getError(UnexpectedError)

    console.log(returnError)

    Logger.error(UnexpectedError.message)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(returnError.statusCode)
      .send(returnError)
  }
}

const search = async (
  request: FastifyRequest<{ Querystring: ProductSearch }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const records = await model.search(request.query)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(StatusCodes.OK)
      .send(records)
  } catch (error) {
    const UnexpectedError = error as FastifyError
    const returnError: ErrorType = getError(UnexpectedError)

    console.log(returnError)

    Logger.error(UnexpectedError.message)

    return reply
      .header('Content-Type', CONTENT_TYPE)
      .status(returnError.statusCode)
      .send(returnError)
  }
}

export const controller = {
  create,
  getAll,
  getById,
  search
}
