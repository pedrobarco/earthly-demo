const baseConfig = require("./jest.config");

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/tests/integration'],
    displayName: {
        name: 'integration',
        color: 'cyan',
    },
}
