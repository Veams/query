import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('trigger() - trigger custom event (with additional data)', () => {
	document.body.innerHTML = `
	<div id="target-el" class="target-el">
		<p id="test-el" class="test-el">
			<span>text content 2</span>
		</p>
	    <div id="test-el-2" class="test-el-2">text content 2</div>
	</div>
	<div id="target-el-2" class="target-el">
		<span id="test-el-3" class="test-el-3">text content 3</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $(document.getElementById('target-el'));

	const handler = jest.fn((evt) => {
		const evtData = {
			foo: true,
			str: 'test'
		};
		
		expect(evt.type).toBe('customEvent');
		expect(evt.detail).toMatchObject(evtData);
	});

	$targetEls.on('customEvent', undefined, handler);
	$targetEls.trigger('customEvent', {
		detail: {
			foo: true,
			str: 'test'
		}
	});

	expect(handler).toBeCalledTimes(1);
});