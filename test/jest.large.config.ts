import type {Config} from '@jest/types';
import base from './jest.base.config';

const config: Config.InitialOptions = {
  ...base,
  collectCoverage: true,
  coverageDirectory: '../coverage/large',
  reporters: ['default', ['jest-junit', {outputDirectory: 'coverage/large'}]],
  testMatch: ['<rootDir>/**/test/large/*.test.ts'],
};
export default config;
