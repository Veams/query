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

test('outerHeight() - get height', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">
        <span>text content</span>
    </div>`;

	const $targetEl: VeamsQueryObject = $(document.getElementById('target-el'));
	const outerHeight: number = $targetEl.outerHeight();

	expect($targetEl).toHaveLength(1);
	expect(outerHeight).toBe(200);
});

test('outerHeight() - get height (including margin)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el" style="margin-top: 10px; margin-bottom: 10px;">
        <span>text content</span>
    </div>
    <div id="target-el-2" class="target-el" style="margin-top: 20px; margin-bottom: 20px;">
        <span>text content</span>
    </div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const outerHeight: number = $targetEls.outerHeight(true);

	expect($targetEls).toHaveLength(2);
	expect(outerHeight).toBe(220);
});