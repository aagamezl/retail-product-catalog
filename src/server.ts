import { app } from './app'
import { config } from '../config'
import { Logger } from './utils/logger'

const port: number = config.port ?? 3000
const host: string = config.host ?? '0.0.0.0'

interface ErrnoException extends Error {
  errno?: number | undefined
  code?: string | undefined
  path?: string | undefined
  syscall?: string | undefined
}

const onError = (error: ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      Logger.error(`${bind} requires elevated privileges`)

      break
    }

    case 'EADDRINUSE': {
      Logger.error(`${bind} is already in use`)

      break
    }

    default: {
      throw error
    }
  }

  process.exit(1)
}

const onListening = (error: Error | null, address: string): void => {
  if (error != null) {
    onError(error)
  }

  Logger.info(`Listening at ${address}`)
}

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM signal received: closing HTTP server')

  app.close(() => {
    Logger.info('HTTP server closed')
  })
})

process.on('unhandledRejection', reason => {
  throw reason
})

process.on('uncaughtException', error => {
  console.error(error)

  setImmediate(() => {
    process.exit(1)
  })
})

app.listen({ port, host }, onListening)
