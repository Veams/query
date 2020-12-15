import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';
import {Offset} from '../src/veams-query.m';

beforeEach(() => {
	HTMLElement.prototype.getBoundingClientRect = jest.fn(()=> {
		return {
			top: 20,
			right: 0,
			bottom: 0,
			left: 20,
			x: 0,
			y: 0,
			height: 200,
			width: 200,
			toJSON: ()=> {}
		}
	});
});

test('offset() - get offset', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">
        <span id="target-el-2">text content</span>
    </div>
	<div id="target-el" class="target-el">
        <span id="target-el-2">text content</span>
    </div>`;

	const $targetEl: VeamsQueryObject = $(document.getElementById('target-el'));
	const offset: Offset = $targetEl.offset();

	expect(offset.top).toBe(20);
	expect(offset.left).toBe(20);
});