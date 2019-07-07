import * as Sentry from "@sentry/node"

export default () => {
  Sentry.init({ dsn: process.env.DSN_SENTRY_URL })
}