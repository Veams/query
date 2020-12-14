import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('add() - selector string', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="target-el-2" class="target-el">text content</div>
    <div id="target-el-3" class="target-el">text content</div>
    <div id="test-el" class="test-el">text content</div>`;

	const $targetEl: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $targetEl.add('.test-el');

	expect($targetEl).toHaveLength(3);
	expect($testEls).toHaveLength(4);
	expect($testEls[3]).toHaveAttribute('id', 'test-el');
});

test('add() - HTML element', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="target-el-2" class="target-el">text content</div>
    <div id="target-el-3" class="target-el">text content</div>
    <div id="test-el" class="test-el">text content</div>`;

	const $targetEl: VeamsQueryObject = $('.target-el');
	const testEl: HTMLElement = document.getElementById('test-el');
	const $testEls: VeamsQueryObject = $targetEl.add(testEl);

	expect($targetEl).toHaveLength(3);
	expect($testEls).toHaveLength(4);
	expect($testEls[3]).toHaveAttribute('id', 'test-el');
});

test('add() - VeamsQueryObject', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="target-el-2" class="target-el">text content</div>
    <div id="target-el-3" class="target-el">text content</div>
    <div id="test-el" class="test-el">text content</div>`;

	const $targetEl: VeamsQueryObject = $('.target-el');
	const $testEl: VeamsQueryObject = $('#test-el');
	const $testEls: VeamsQueryObject = $targetEl.add($testEl);

	expect($targetEl).toHaveLength(3);
	expect($testEls).toHaveLength(4);
	expect($testEls[3]).toHaveAttribute('id', 'test-el');
});