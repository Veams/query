const {defaults} = require('jest-config');

const testMatch = defaults.testMatch
testMatch.push('**/tests/**/*.ts');
testMatch.push('!**/*.d.ts');

module.exports = {
	globals: {
		'ts-jest': {
			isolatedModules: true
		}
	},
	testMatch,
	'transform': {
		'^.+\\.ts$': 'ts-jest'
	},
	collectCoverageFrom: ['**/*.ts', '!**/*.d.ts',],
	coveragePathIgnorePatterns: [...defaults.coveragePathIgnorePatterns, '/src/tests/myUnit/unit.ts',
		'/src/app/shared/scripts/templates.ts'],
	coverageReporters: ['lcov'],
	coverageDirectory: 'reports',
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '/src/tests/myUnit/unit.ts',
		'/src/app/shared/scripts/templates.ts']
}
