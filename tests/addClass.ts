import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('addClass() - add one class', () => {
	document.body.innerHTML = `
    <div class="test-el target-el">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $('.test-el');

	$targetEls.addClass('is-test');

	expect($testEls[0]).toHaveClass('test-el target-el is-test');
	expect($testEls[1]).toHaveClass('test-el');
	expect($testEls[2]).toHaveClass('test-el target-el is-test');
});

test('addClass() - add two classes', () => {
	document.body.innerHTML = `
    <div class="test-el target-el">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $('.test-el');

	$targetEls.addClass('is-test is-test-2');

	expect($testEls[0]).toHaveClass('test-el target-el is-test is-test-2');
	expect($testEls[1]).toHaveClass('test-el');
	expect($testEls[2]).toHaveClass('test-el target-el is-test is-test-2');
});