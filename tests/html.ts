import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('html() - get HTML content', () => {
	document.body.innerHTML = `
	<div id="target-el" class="target-el">
		<p id="test-el" class="test-el">
			<strong>text content 2</strong>
		</p>
	    <div id="test-el-2" class="test-el-2">text content 2</div>
	</div>
	<div id="target-el-2" class="target-el">
		<span id="test-el-3" class="test-el-3">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const testEL: HTMLElement = document.getElementById('target-el');
	const html: string = $targetEls.html() as string;

	expect($targetEls).toHaveLength(2);
	expect(html).toBe(testEL.innerHTML);
});

test('html() - set HTML content', () => {
	document.body.innerHTML = `
	<div id="target-el" class="target-el">
		<p id="test-el" class="test-el">
			<strong>text content 2</strong>
		</p>
	    <div id="test-el-2" class="test-el-2">text content 2</div>
	</div>
	<div id="target-el-2" class="target-el">
		<span id="test-el-3" class="test-el-3">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const testEl: HTMLElement = document.getElementById('target-el');
	const testEl2: HTMLElement = document.getElementById('target-el-2');

	$targetEls.html('<span id="test-el-3" class="test-el-3">text content 3</span>');

	expect(testEl).toContainHTML('<span id="test-el-3" class="test-el-3">text content 3</span>');
	expect(testEl2).toContainHTML('<span id="test-el-3" class="test-el-3">text content 3</span>');
});