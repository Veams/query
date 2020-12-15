import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('prop() - get prop', () => {
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
	const prop: string = $targetEls.prop('tabIndex') as string;

	expect(prop).toBe(0);

});

test('prop() - set prop', () => {
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

	$targetEls.prop('tabindex', -1);

	expect($targetEls[0]).toHaveAttribute('tabindex', '0');
	expect($targetEls[0]).toHaveProperty('tabindex', -1);

	expect($targetEls[1]).toHaveAttribute('tabindex', '1');
	expect($targetEls[1]).toHaveProperty('tabindex', -1);

	expect($targetEls[2]).toHaveAttribute('tabindex', '2');
	expect($targetEls[2]).toHaveProperty('tabindex', -1);
});