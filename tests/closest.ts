import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('closest() - get closest element (element itself)', () => {
	document.body.innerHTML = `
	<div id="parent-1" class="test-el">
		<div id="parent-2">
			<div id="parent-3" class="test-el">
                <div id="target-el" class="target-el test-el">text content</div>
			</div>
		</div>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $targetEls.closest('.test-el')

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el');
});

test('closest() - get closest element (parent element)', () => {
	document.body.innerHTML = `
	<div id="parent-1" class="test-el">
		<div id="parent-2">
			<div id="parent-3" class="test-el">
                <div id="target-el" class="target-el">text content</div>
			</div>
		</div>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $targetEls.closest('.test-el')

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'parent-3');
});

test('closest() - get closest element (grand grand parent element)', () => {
	document.body.innerHTML = `
	<div id="parent-1" class="test-el">
		<div id="parent-2">
			<div id="parent-3">
                <div id="target-el" class="target-el">text content</div>
			</div>
		</div>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $targetEls.closest('.test-el')

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'parent-1');
});