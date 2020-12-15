import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('removeAttr() - remove attribute', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0">
			<span>text content 2</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	$targetEls.removeAttr('tabindex');

	expect($targetEls[0]).not.toHaveAttribute('tabindex');
	expect($targetEls[1]).not.toHaveAttribute('tabindex');
	expect($targetEls[2]).not.toHaveAttribute('tabindex');
});