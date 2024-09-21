import { pino } from 'pino'

const pinoLogger = pino({
  level: 'trace'
})

Object.defineProperty(Error.prototype, 'toJSON', {
  value: function toJSON() {
    return {
      ...this,
      name: this.name,
      message: this.message,
      stack: this.stack
    }
  },
  writable: true
})

export const Logger = {
  trace<T extends object>(msg: string, context?: T): void {
    pinoLogger.trace(context ?? {}, msg)
  },
  debug<T extends object>(msg: string, context?: T): void {
    pinoLogger.debug(context ?? {}, msg)
  },
  info<T extends object>(msg: string, context?: T): void {
    pinoLogger.info(context ?? {}, msg)
  },
  warn<T extends object>(msg: string, context?: T): void {
    pinoLogger.warn(context ?? {}, msg)
  },
  error<T extends object>(msg: string, context?: T): void {
    pinoLogger.error(context ?? {}, msg)
  },
  fatal<T extends object>(msg: string, context?: T): void {
    pinoLogger.fatal(context ?? {}, msg)
  }
}
