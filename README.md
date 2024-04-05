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

## Usage

Import the service to use it:

```ts
import sentry from "@benhepburn/adonis-sentry/service"
```

To capture all exceptions, add this line to app/exceptions/handler inside the handle function:

```ts
sentry.captureException(error);
```

This can be used to capture exceptions manually as well:

```ts
try {
  ...
} catch (error: unknown) {
  sentry.captureException(error);
}
```
