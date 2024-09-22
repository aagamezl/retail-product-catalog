import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { ErrorResponseSchema } from './error-response.schema'
import { errorSchema } from './error-schema'

export const ErrorByIdResponseSchema = {
  [StatusCodes.NOT_FOUND]: errorSchema(ReasonPhrases.NOT_FOUND),
  ...ErrorResponseSchema
}
