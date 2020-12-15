import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('remove() - check for elements to be removed', () => {
	document.body.innerHTML = `
	<div id="target-el" class="target-el">
		<p id="test-el">
			<span>text content 2</span>
		</p>
	    <div id="test-el-2">text content 2</div>
	</div>
	<div id="target-el-2" class="target-el">
		<span id="test-el-3">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const targetEl: HTMLElement = document.getElementById('target-el');
	const targetEl2: HTMLElement = document.getElementById('target-el-2');

	$targetEls.empty();

	expect(targetEl.children).toHaveLength(0);
	expect(targetEl2.children).toHaveLength(0);
});