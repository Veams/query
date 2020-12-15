import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('is() - check if element matches selector', () => {
	document.body.innerHTML = `
    <div id="test-el" class="target-el">text content</div>
    <div id="test-el-2" class="target-el">text content</div>
    <div id="test-el-3" class="target-el" tabindex="0">text content</div>
    <div id="test-el-4" class="target-el">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	expect($targetEls).toHaveLength(4);
	expect($targetEls.is('#test-el-3')).toBeTruthy();
	expect($targetEls.is('#test-el-5')).toBeFalsy();
	expect($targetEls.is('.target-el')).toBeTruthy();
	expect($targetEls.is('.test-el')).toBeFalsy();
	expect($targetEls.is('[tabindex]')).toBeTruthy();
	expect($targetEls.is('[tabindex="0"]')).toBeTruthy();
	expect($targetEls.is('[tabindex="1"]')).toBeFalsy();
	expect($targetEls.is('[aria-controls]')).toBeFalsy();
});