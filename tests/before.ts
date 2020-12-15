import $, {VeamsQueryObject} from '../src';

test('before() - insert element before (HTML String)', () => {
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

	$targetEls.before('<strong>inserted element</strong>');

	expect(document.querySelectorAll('strong')).toHaveLength(3);
	expect(testEl.firstElementChild.tagName).toBe('STRONG');
	expect(testEl.children[2].tagName).toBe('STRONG');
	expect(testEl2.firstElementChild.tagName).toBe('STRONG');
});

test('before() - insert element before (VeamsQueryObject)', () => {
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

	$targetEls.before($insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect(testEl.children).toHaveLength(2);
	expect(testEl2.children).toHaveLength(2);
	expect(testEl2.firstElementChild.tagName).toBe('STRONG');
});

test('before() - insert element before (HTMLElement)', () => {
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

	$targetEls.before(insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect(testEl.children).toHaveLength(2);
	expect(testEl2.children).toHaveLength(2);
	expect(testEl2.firstElementChild.tagName).toBe('STRONG');
});