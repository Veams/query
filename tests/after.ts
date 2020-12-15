import $, {VeamsQueryObject} from '../src';

test('after() - insert element after (HTML String)', () => {
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
	const testEl: HTMLElement = document.getElementById('test-el');
	const testEl2: HTMLElement = document.getElementById('test-el-2');

	$targetEls.after('<strong>inserted element</strong>');

	expect(document.querySelectorAll('strong')).toHaveLength(3);
	expect(testEl.children[1].tagName).toBe('STRONG');
	expect(testEl.lastElementChild.tagName).toBe('STRONG');
	expect(testEl2.lastElementChild.tagName).toBe('STRONG');
});

test('after() - insert element after (VeamsQueryObject)', () => {
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
	const testEl: HTMLElement = document.getElementById('test-el');
	const testEl2: HTMLElement = document.getElementById('test-el-2');
	const $insertEl: VeamsQueryObject = $('<strong>inserted element</strong>');

	$targetEls.after($insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect(testEl.children).toHaveLength(2);
	expect(testEl2.children).toHaveLength(2);
	expect(testEl2.lastElementChild.tagName).toBe('STRONG');
});

test('after() - insert element after (HTMLElement)', () => {
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
	const testEl: HTMLElement = document.getElementById('test-el');
	const testEl2: HTMLElement = document.getElementById('test-el-2');
	const insertEl: HTMLElement = document.createElement('strong');

	insertEl.innerText = 'inserted element';

	$targetEls.after(insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect(testEl.children).toHaveLength(2);
	expect(testEl2.children).toHaveLength(2);
	expect(testEl2.lastElementChild.tagName).toBe('STRONG');
});