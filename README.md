# AdonisJS Sentry

## Install

Install from npm:

```sh
npm install @benhepburn/adonis-sentry
```

or

```sh
pnpm install @benhepburn/adonis-sentry
```

or

```sh
yarn add @benhepburn/adonis-sentry
```

Then, configure the package for Adonis:

```sh
node ace configure @benhepburn/adonis-sentry
```

## Configuration

Enter the Sentry DSN and Traces sample rate in your .env file:

```dotenv
SENTRY_DSN=https://<...>.sentry.io/<...>
SENTRY_TRACES_SAMPLE_RATE=1.0 # Set this to a lower value in production
```

To enable enhanced event data, you must enable useAsyncLocalStorage in config/app.ts 
so the current request can be fetched ([see caveats here](https://docs.adonisjs.com/guides/async-local-storage#caveats)):

```ts
useAsyncLocalStorage: true,
```

## Usage

Import the service to use it:

```ts
import sentry from "@benhepburn/adonis-sentry/service"
```

To capture all exceptions, add the capture line to app/exceptions/handler.ts inside the report function:

```ts
async report(error: unknown, ctx: HttpContext) {
  sentry.captureException(error); // Add this line
  ...
  return super.report(error, ctx);
}
```

Exceptions can be captured manually as well:

```ts
try {
  ...
} catch (error: unknown) {
  sentry.captureException(error);
}
```
