import $, {VeamsQueryObject} from '../src';

test('prepend() - prepend element (HTML String)', () => {
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

	$targetEls.prepend('<strong>inserted element</strong>');

	expect(document.querySelectorAll('strong')).toHaveLength(2);
	expect($targetEls[0].firstChild.tagName).toBe('STRONG');
	expect($targetEls[1].firstChild.tagName).toBe('STRONG');
});

test('prepend() - prepend element (VeamsQueryObject)', () => {
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
	const $insertEl: VeamsQueryObject = $('<strong>inserted element</strong>');

	$targetEls.prepend($insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect($targetEls[1].firstChild.tagName).toBe('STRONG');
});

test('prepend() - prepend element (HTMLElement)', () => {
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
	const insertEl: HTMLElement = document.createElement('strong');

	insertEl.textContent = 'inserted element';

	$targetEls.prepend(insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect($targetEls[1].firstChild.tagName).toBe('STRONG');
});