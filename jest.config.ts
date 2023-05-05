import type {Config} from '@jest/types'
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  globalTeardown: '<rootDir>/__tests__/jest-globals-teardown.ts',
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts', '**/*.test.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007'
  }
}

export default config
