import { HttpContext } from '@adonisjs/core/http'
import { EventProcessor } from '@sentry/types/types/eventprocessor.js'

export const adonisEventProcessor: EventProcessor = (event, _hint) => {
  const ctx = HttpContext.get()
  if (!ctx) return event

  if (!event.contexts) event.contexts = {}

  // Add request data
  event.request = {
    method: ctx.request.method(),
    url: ctx.request.url(true),
  }

  // Add response data
  event.contexts.response = {
    status_code: ctx.response.getStatus(),
  }

  // Add user
  // @ts-ignore
  event.user = ctx.auth?.user || null

  return event
}
