const baseConfig = require("./jest.config");

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/src'],
    displayName: {
        name: 'unit',
        color: 'white',
    },
}
