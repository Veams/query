import '@testing-library/jest-dom';
import {dimension} from '@shopify/jest-dom-mocks';

import $, {VeamsQueryObject} from '../src';

beforeEach(() => {
	dimension.mock({
		offsetHeight: 200,
		offsetWidth: 200
	});
});

afterEach(() => {
	dimension.restore();
});

test('outerWidth() - get width', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">
        <span>text content</span>
    </div>`;

	const $targetEl: VeamsQueryObject = $(document.getElementById('target-el'));
	const outerWidth: number = $targetEl.outerWidth();

	expect($targetEl).toHaveLength(1);
	expect(outerWidth).toBe(200);
});

test('outerWidth() - get width (including margin)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el" style="margin-left: 10px; margin-right: 10px;">
        <span>text content</span>
    </div>
    <div id="target-el-2" class="target-el" style="margin-left: 20px; margin-right: 20px;">
        <span>text content</span>
    </div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const outerWidth: number = $targetEls.outerWidth(true);

	expect($targetEls).toHaveLength(2);
	expect(outerWidth).toBe(220);
});