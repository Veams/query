import $, {VeamsQueryObject} from '../src';

test('append() - append element (HTML String)', () => {
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

	$targetEls.append('<strong>inserted element</strong>');

	expect(document.querySelectorAll('strong')).toHaveLength(2);
	expect($targetEls[0].lastChild.tagName).toBe('STRONG');
	expect($targetEls[1].lastChild.tagName).toBe('STRONG');
});

test('append() - append element (VeamsQueryObject)', () => {
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

	$targetEls.append($insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect($targetEls[1].lastChild.tagName).toBe('STRONG');
});

test('append() - append element (HTMLElement)', () => {
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

	$targetEls.append(insertEl);

	expect(document.querySelectorAll('strong')).toHaveLength(1);
	expect($targetEls[1].lastChild.tagName).toBe('STRONG');
});