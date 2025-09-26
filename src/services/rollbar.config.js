export default {
  accessToken: import.meta.env.VITE_JETON_CLIENT_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: import.meta.env.VITE_ROLLBAR_ENV || import.meta.env.NODE_ENV,
  },
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: import.meta.env.SOURCE_VERSION,
      guess_uncaught_frames: true
    }
  }

};
