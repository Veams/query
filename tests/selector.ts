import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('$() - empty selector', () => {
	const $testEls: VeamsQueryObject = $();

	expect($testEls).toHaveLength(0);
	expect($testEls.type).toBe('VeamsQueryObject')
	expect($testEls[0]).toBeUndefined();
});

test('$() - string selector (id)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $testEls: VeamsQueryObject = $('#target-el-3');

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-3');
});

test('$() - string selector (id) with VeamsQueryObject context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $contextEls = $('.context-el');
	const $testEls1: VeamsQueryObject = $('#target-el-4', $contextEls);
	const $testEls2: VeamsQueryObject = $('#target-el-2', $contextEls);

	expect($contextEls).toHaveLength(2);

	expect($testEls1).toHaveLength(1);
	expect($testEls1[0]).toHaveAttribute('id', 'target-el-4');

	expect($testEls2).toHaveLength(0);
	expect($testEls2[0]).toBeUndefined();
});

test('$() - string selector (id) with HTMLElement context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const contextEl1 = document.getElementById('context-el-2');
	const $testEls1: VeamsQueryObject = $('#target-el-4', contextEl1);

	const contextEl2 = document.getElementById('context-el');
	const $testEls2: VeamsQueryObject = $('#target-el-4', contextEl2);

	expect($testEls1).toHaveLength(1);
	expect($testEls1[0]).toHaveAttribute('id', 'target-el-4');

	expect($testEls2).toHaveLength(0);
	expect($testEls2[0]).toBeUndefined();
});

test('$() - string selector (class)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $testEls: VeamsQueryObject = $('.target-el');

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (class) with VeamsQueryObject context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $contextEls = $('.context-el');
	const $testEls: VeamsQueryObject = $('.target-el', $contextEls);

	expect($contextEls).toHaveLength(2);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (class) with HTMLElement context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const contextEl1 = document.getElementById('context-el-2');
	const $testEls1: VeamsQueryObject = $('.target-el', contextEl1);

	const contextEl2 = document.getElementById('context-el');
	const $testEls2: VeamsQueryObject = $('.target-el', contextEl2);

	expect($testEls1).toHaveLength(1);
	expect($testEls1[0]).toHaveAttribute('id', 'target-el-4');

	expect($testEls2).toHaveLength(0);
	expect($testEls2[0]).toBeUndefined();
});

test('$() - string selector (attribute)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $testEls: VeamsQueryObject = $('[tabindex]');

	expect($testEls).toHaveLength(3);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
	expect($testEls[2]).toHaveAttribute('id', 'target-el-5');
});

test('$() - string selector (attribute) with VeamsQueryObject context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $contextEls = $('.context-el');
	const $testEls: VeamsQueryObject = $('[tabindex]', $contextEls);

	expect($contextEls).toHaveLength(2);

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (attribute) with HTMLElement context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const contextEl = document.getElementById('context-el-2');
	const $testEls: VeamsQueryObject = $('[tabindex]', contextEl);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (tag)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $testEls: VeamsQueryObject = $('span');

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (tag) with VeamsQueryObject context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $contextEls = $('.context-el');
	const $testEls: VeamsQueryObject = $('span', $contextEls);

	expect($contextEls).toHaveLength(2);

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('$() - string selector (tag) with HTMLElement context', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const contextEl = document.getElementById('context-el-2');
	const $testEls: VeamsQueryObject = $('span', contextEl);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (VeamsQueryObject)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $testEls: VeamsQueryObject = $($targetEls);

	expect($targetEls).toHaveLength(2);
	expect($targetEls[0]).toHaveAttribute('id', 'target-el');
	expect($targetEls[1]).toHaveAttribute('id', 'target-el-4');

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (VeamsQueryObject) with context VeamsQueryObject', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $contextEls: VeamsQueryObject = $('.context-el');
	const $testEls: VeamsQueryObject = $($targetEls, $contextEls);

	expect($targetEls).toHaveLength(2);
	expect($targetEls[0]).toHaveAttribute('id', 'target-el');
	expect($targetEls[1]).toHaveAttribute('id', 'target-el-4');

	expect($contextEls).toHaveLength(2);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (VeamsQueryObject) with context HTMLElement', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const contextEl: HTMLElement = document.getElementById('context-el-2')
	const $testEls: VeamsQueryObject = $($targetEls, contextEl);

	expect($targetEls).toHaveLength(2);
	expect($targetEls[0]).toHaveAttribute('id', 'target-el');
	expect($targetEls[1]).toHaveAttribute('id', 'target-el-4');

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (HTMLElement)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const targetEl: HTMLElement = document.getElementById('target-el-4');
	const $testEls: VeamsQueryObject = $(targetEl);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (HTMLElement) with context VeamsQueryObject', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const targetEl: HTMLElement = document.getElementById('target-el-4');
	const $contextEls: VeamsQueryObject = $('.context-el');
	const $testEls: VeamsQueryObject = $(targetEl, $contextEls);

	expect($contextEls).toHaveLength(2);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - selector (HTMLElement) with context HTMLElement', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">text content</div>
    <div id="context-el" class="context-el">
        <span id="target-el-2" tabindex="0">text content</span>
    </div>
    <div id="target-el-3">text content</div>
    <div id="context-el-2" class="context-el context-el-2">
        <span id="target-el-4" class="target-el target-el-2" tabindex="1">text content</span>
	</div>
    <div id="target-el-5" tabindex="0">text content</div>`;

	const targetEl: HTMLElement = document.getElementById('target-el-4');
	const contextEl: HTMLElement = document.getElementById('context-el-2');
	const $testEls: VeamsQueryObject = $(targetEl, contextEl);

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-4');
});

test('$() - create element from HTML string', () => {

	const $contextEl: VeamsQueryObject = $('<div id="context-el" class="context-el"><span id="target-el">text content</span></div>');

	console.log('typeof $contextEl[0]: ', typeof $contextEl[0]);

	expect($contextEl).toHaveLength(1);
	expect($contextEl[0].tagName).toBe('DIV');
	expect($contextEl[0].id).toBe('context-el');
	expect($contextEl[0].classList.contains('context-el')).toBeTruthy();
	expect($contextEl[0].textContent).toBe('text content');
	expect($contextEl[0].children[0].tagName).toBe('SPAN');
	expect($contextEl[0].children[0].id).toBe('target-el');
	expect($contextEl[0].children[0].textContent).toBe('text content');
});