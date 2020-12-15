import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('eq() - insert element before (HTML String)', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el">
			<span>text content 2</span>
		</p>
	    <div id="target-el-2" class="target-el">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	expect($targetEls.eq(0)[0]).toHaveAttribute('id', 'target-el');
	expect($targetEls.eq(1)[0]).toHaveAttribute('id', 'target-el-2');
	expect($targetEls.eq(2)[0]).toHaveAttribute('id', 'target-el-3');
});