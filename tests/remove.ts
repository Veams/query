import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('remove() - check for elements to be removed', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el">
			<span>text content 2</span>
		</p>
	    <div id="target-el-2">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const testEl: HTMLElement = document.getElementById('test-el');
	const testEl2: HTMLElement = document.getElementById('test-el-2');

	$targetEls.remove();

	expect(testEl.children).toHaveLength(1);
	expect(testEl.children[0].tagName).toBe('DIV');
	expect(testEl2.children).toHaveLength(0);
});