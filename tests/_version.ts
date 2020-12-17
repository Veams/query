import '@testing-library/jest-dom';
import $ from '../src';
import {version} from '../package.json';

test('check version', () => {
	const versionPropDesc = Object.getOwnPropertyDescriptor($, 'version');

	expect(versionPropDesc.value).toBe(version);
	expect(versionPropDesc.writable).toBeFalsy();
	expect(versionPropDesc.configurable).toBeFalsy();
});