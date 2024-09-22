import { PROBLEM_CONTENT_TYPE } from '../constants'

export const errorSchema = (description: string) => {
  return {
    description,
    content: {
      [PROBLEM_CONTENT_TYPE]: {
        schema: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            status: { type: 'number' },
            title: { type: 'string' },
            details: { type: 'string' }
          }
        }
      }
    }
  }
}
