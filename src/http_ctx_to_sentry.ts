import { HttpContext } from '@adonisjs/core/http'
import { Scope } from '@sentry/node'

export function httpCtxToSentry(scope: Scope, ctx: HttpContext) {
  // @ts-ignore
  scope.setUser(ctx.auth?.user || null)
  scope.setTag('method', ctx.request.method())
  scope.setTag('status', ctx.response.getStatus())
  scope.setContext('request', {
    id: ctx.request.id(),
    url: ctx.request.url(true),
    method: ctx.request.method(),
  })
}
