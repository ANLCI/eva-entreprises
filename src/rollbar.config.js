export default {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN ?? '',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT ?? 'development',
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: import.meta.env.VITE_SOURCE_VERSION,
        guess_uncaught_frames: true,
      },
    },
  },
}
