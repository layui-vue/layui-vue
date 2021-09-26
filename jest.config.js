module.exports = {
  roots: ['<rootDir>/test'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'vue', 'js', 'jsx', 'tsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(@vue/shared|element-plus)/)'],
  moduleNameMapper: { '\\.css$': '<rootDir>/test/__mocks__/css.ts' },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
}
