import '@testing-library/jest-dom'
import $, {VeamsQueryObject} from '../src';

test('find() - string selector (id)', () => {
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

	const $body = $(document.body);
	const $testEls: VeamsQueryObject = $body.find('#target-el-3');

	expect($testEls).toHaveLength(1);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-3');
});

test('find() - string selector (class)', () => {
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

	const $body = $(document.body);
	const $testEls: VeamsQueryObject = $body.find('.target-el');

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('find() - string selector (attribute)', () => {
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

	const $body = $(document.body);
	const $testEls: VeamsQueryObject = $body.find('[tabindex]');

	expect($testEls).toHaveLength(3);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
	expect($testEls[2]).toHaveAttribute('id', 'target-el-5');
});

test('find() - string selector (tag)', () => {
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

	const $body = $(document.body);
	const $testEls: VeamsQueryObject = $body.find('span');

	expect($testEls).toHaveLength(2);
	expect($testEls[0]).toHaveAttribute('id', 'target-el-2');
	expect($testEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('find() - selector (VeamsQueryObject)', () => {
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

	const $testEls: VeamsQueryObject = $('div');
	const $targetEls: VeamsQueryObject = $('.target-el');
	const $filteredEls: VeamsQueryObject = $testEls.find($targetEls);

	expect($testEls).toHaveLength(5);

	expect($targetEls).toHaveLength(2);
	expect($targetEls[0]).toHaveAttribute('id', 'target-el');
	expect($targetEls[1]).toHaveAttribute('id', 'target-el-4');

	expect($filteredEls).toHaveLength(2);
	expect($filteredEls[0]).toHaveAttribute('id', 'target-el');
	expect($filteredEls[1]).toHaveAttribute('id', 'target-el-4');
});

test('find() - selector (HTMLElement)', () => {
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

	const $testEls: VeamsQueryObject = $('div');
	const targetEl: HTMLElement = document.getElementById('target-el-4');
	const $filteredEls: VeamsQueryObject = $testEls.find(targetEl);

	expect($testEls).toHaveLength(5);

	expect($filteredEls).toHaveLength(1);
	expect($filteredEls[0]).toHaveAttribute('id', 'target-el-4');
});