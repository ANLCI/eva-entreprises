export default {
  accessToken: 'ad7603d5788b492384bb8fd9d20da8b4',
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
