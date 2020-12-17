import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('removeClass() - remove one class', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el is-test is-test-2">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $('.test-el');

	$targetEls.removeClass('is-test');

	expect($testEls[0]).toHaveClass('test-el target-el is-test-2');
	expect($testEls[1]).toHaveClass('test-el');
	expect($testEls[2]).toHaveClass('test-el target-el is-test-2');
});

test('removeClass() - remove two classes', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el is-test">text content</div>`;

	const $testEls: VeamsQueryObject = $('.test-el');

	$testEls.removeClass('is-test is-test-2');

	expect($testEls[0]).toHaveClass('test-el target-el');
	expect($testEls[1]).toHaveClass('test-el');
	expect($testEls[2]).toHaveClass('test-el target-el');
});

test('removeClass() - remove all classes', () => {
	document.body.innerHTML = `
    <div class="test-el target-el is-test is-test-2">text content</div>
    <div class="test-el">text content</div>
    <div class="test-el target-el is-test is-test-2">text content</div>`;

	const $testEls: VeamsQueryObject = $('.test-el');

	$testEls.removeClass();

	expect($testEls[0]).not.toHaveAttribute('class');
	expect($testEls[1]).not.toHaveAttribute('class');
	expect($testEls[2]).not.toHaveAttribute('class');
});