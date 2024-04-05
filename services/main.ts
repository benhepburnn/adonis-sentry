import app from '@adonisjs/core/services/app'
import * as Sentry from '@sentry/node'

let sentry: typeof Sentry

/**
 * Returns a singleton instance of Sentry from the container.
 */
await app.booted(async () => {
  sentry = await app.container.make('sentry')
})

export { sentry as default }
