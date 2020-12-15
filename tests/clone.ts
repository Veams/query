import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('clone() - clone element', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">
        <span id="test-el">text content</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $clone: VeamsQueryObject = $targetEls.clone();

	expect($targetEls).toHaveLength(1);

	expect($clone[0]).toHaveAttribute('id', 'target-el');
	expect($clone[0]).toHaveClass('target-el');
	expect($clone[0].children).toHaveLength(0);
});

test('clone() - clone element (with children)', () => {
	document.body.innerHTML = `
    <div id="target-el" class="target-el">
        <span id="test-el">text content</span>
    </div>
    <div id="target-el-2" class="target-el">
        <span id="test-el">text content</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const $clone: VeamsQueryObject = $targetEls.clone(true);

	expect($targetEls).toHaveLength(2);

	expect($clone[0].isEqualNode($targetEls[0])).toBeTruthy();
	expect($clone[0].isEqualNode($targetEls[1])).toBeFalsy();
});