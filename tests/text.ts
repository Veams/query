import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('text() - get text', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2">text <a href="#">content 3</a></span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const text1: string = $targetEls.text() as string;
	

	expect(text1).toBe('text content 1 text content 2 text content 3');
});

test('text() - set text', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2">text <a href="#">content 3</a></span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	expect($targetEls[0].children).toHaveLength(1);
	expect($targetEls[2].children).toHaveLength(1);

	$targetEls.text('new text content');

	expect($targetEls[0]).toHaveTextContent('new text content');
	expect($targetEls[0].children).toHaveLength(0);

	expect($targetEls[1]).toHaveTextContent('new text content');

	expect($targetEls[2]).toHaveTextContent('new text content');
	expect($targetEls[2].children).toHaveLength(0);
});