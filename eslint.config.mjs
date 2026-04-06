import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: [
      'node_modules',
      '.next',
      'out',
      'build',
      'dist',
      'coverage',
      'components/ui/*.tsx',
    ],
  },
];

export default config;
