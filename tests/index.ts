import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('index() - get index', () => {
	document.body.innerHTML = `
	<ul id="target-1" class="test-el">
		<li id="target-2">list item</li>
		<li id="target-3">list item</li>
		<li id="target-4">list item</li>
		<li id="target-5">list item</li>
	</ul>`;

	const $targetEl: VeamsQueryObject = $(document.getElementById('target-4'));
	const idx: number = $targetEl.index();

	expect(idx).toBe(2);
});