import type { ApplicationService } from '@adonisjs/core/types'
import * as Sentry from '@sentry/node'
import { NodeOptions } from '@sentry/node'
import { adonisEventProcessor } from '../src/adonis_event_processor.js'

export default class SentryProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('sentry', async (resolver) => {
      const config = await resolver.make('config')
      const sentryConfig = config.get('sentry') as NodeOptions

      Sentry.init(sentryConfig)
      Sentry.addEventProcessor(adonisEventProcessor)

      return Sentry
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shut down the app
   */
  async shutdown() {}
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    sentry: typeof Sentry
  }
}
