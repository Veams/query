import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('hasClass() - check for class', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>`;

	const $testEls: VeamsQueryObject = $('.test-el');

	expect($testEls.hasClass('is-test')).toBeTruthy();
	expect($testEls.hasClass('is-test-3')).toBeFalsy();
});