import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('off() - remove event listener', () => {
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

	const $targetEls: VeamsQueryObject = $('.target-el');
	const handler = jest.fn();

	expect($targetEls).toHaveLength(2);

	$targetEls.on('click', undefined, handler);
	$targetEls.off('click');

	$targetEls[0].dispatchEvent(new MouseEvent('click'));
	$targetEls[1].dispatchEvent(new MouseEvent('click'));

	expect(handler).toBeCalledTimes(0);
});

test('off() - remove event listener (explicit event delegation) without selector', () => {
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
	const $evtTriggerEl: VeamsQueryObject = $(document.getElementById('test-el-2'));

	const handler = jest.fn((evt, currentTarget) => {
		expect(evt.type).toBe('click');
		expect(evt.target.id).toBe('test-el-2');
		expect(currentTarget.id).toBe('test-el-2');
	});

	expect($targetEls).toHaveLength(1);
	expect($evtTriggerEl).toHaveLength(1);

	$targetEls.on('click', '#test-el-2', handler);
	$targetEls.off('click');

	$evtTriggerEl[0].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));

	expect(handler).toBeCalledTimes(1);
});

test('off() - remove event listener (explicit event delegation) with selector', () => {
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
	const $evtTriggerEl: VeamsQueryObject = $(document.getElementById('test-el-2'));

	const handler = jest.fn();

	expect($targetEls).toHaveLength(1);
	expect($evtTriggerEl).toHaveLength(1);

	$targetEls.on('click', '#test-el-2', handler);
	$targetEls.off('click', '#test-el-2');

	$evtTriggerEl[0].dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));

	expect(handler).toBeCalledTimes(0);
});

test('off() - remove event listener (implicit event delegation for non bubbling events)', () => {
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
	const $evtTriggerEl: VeamsQueryObject = $(document.getElementById('test-el-2'));
	const handler = jest.fn();

	expect($targetEls).toHaveLength(1);
	expect($evtTriggerEl).toHaveLength(1);

	$targetEls.on('focus', undefined, handler, true);
	$targetEls.off('focus');

	$evtTriggerEl[0].dispatchEvent(new FocusEvent('focus', {bubbles: false, cancelable: true}));

	expect(handler).toBeCalledTimes(0);
});

test('off() - remove multiple event listeners', () => {
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
	const handler = jest.fn();

	$targetEls.on('click touchstart', undefined, handler);
	$targetEls.off('click touchstart');

	$targetEls[0].dispatchEvent(new MouseEvent('click'));
	$targetEls[0].dispatchEvent(new TouchEvent('touchstart'));

	expect(handler).toBeCalledTimes(0);
});

test('off() - remove one of multiple event listeners', () => {
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

	const handler = jest.fn((evt, currentTarget) => {
		expect(evt.type).toBe('touchstart');
		expect(evt.target.id).toBe('target-el');
		expect(currentTarget.id).toBe('target-el');
	});

	$targetEls.on('click touchstart', undefined, handler);
	$targetEls.off(' click');

	$targetEls[0].dispatchEvent(new MouseEvent('click'));
	$targetEls[0].dispatchEvent(new TouchEvent('touchstart'));

	expect(handler).toBeCalledTimes(1);
});