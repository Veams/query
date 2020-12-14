import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('removeClass() - remove one class', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el is-test is-test-2">text content</div>`;

	const $targetEl: VeamsQueryObject = $('.target-el');
	const $testEl: VeamsQueryObject = $('.test-el');

	$targetEl.removeClass('is-test');

	expect($testEl[0]).toHaveClass('test-el target-el is-test-2');
	expect($testEl[1]).toHaveClass('test-el');
	expect($testEl[2]).toHaveClass('test-el target-el is-test-2');
});

test('removeClass() - remove two classes', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el is-test is-test-2">text content</div>`;

	const $targetEl: VeamsQueryObject = $('.target-el');
	const $testEl: VeamsQueryObject = $('.test-el');

	$targetEl.removeClass('is-test is-test-2');

	expect($testEl[0]).toHaveClass('test-el target-el');
	expect($testEl[1]).toHaveClass('test-el');
	expect($testEl[2]).toHaveClass('test-el target-el');
});