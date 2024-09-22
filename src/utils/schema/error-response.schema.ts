import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { errorSchema } from './error-schema'

export const ErrorResponseSchema = {
  [StatusCodes.BAD_REQUEST]: errorSchema(ReasonPhrases.BAD_REQUEST),
  [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema(
    ReasonPhrases.INTERNAL_SERVER_ERROR
  )
}
