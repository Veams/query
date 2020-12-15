import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('each() - test loop', () => {
	document.body.innerHTML = `
	<ul id="target-el">
		<li id="target-el-2" class="target-el">list item</li>
		<li id="target-el-3" class="target-el">list item</li>
		<li id="target-el-4" class="target-el">list item</li>
		<li id="target-el-5" class="target-el">list item</li>
	</ul>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	expect($targetEls).toHaveLength(4);

	$targetEls.each((idx, element) => {
		expect(element).toHaveAttribute('id', `target-el-${idx + 2}`);
	});
});