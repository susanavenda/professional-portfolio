// Mock import.meta for Jest
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        BASE_URL: '/',
        MODE: 'test',
        DEV: false,
        PROD: true
      }
    }
  },
  writable: true,
  configurable: true
});
