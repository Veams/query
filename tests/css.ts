import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('css() - get css values', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0" style="display: inline-block; background-color: red;">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2" style="display: block; background-color: blue;">
			text <a href="#">content 3</a>
		</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const display: string = $targetEls.css('display') as string;
	const backgroundColor: string = $targetEls.css('background-color') as string;

	expect(display).toBe('inline-block');
	expect(backgroundColor).toBe('red');
});

test('css() - set css values (string)', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0" style="display: inline-block; background-color: red;">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2" style="display: block; background-color: blue;">
			text <a href="#">content 3</a>
		</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	$targetEls.css('background-color', 'green');

	expect($targetEls[0]).toHaveStyle('background-color: green');
	expect($targetEls[1]).toHaveAttribute('style', 'background-color: green;');
	expect($targetEls[1]).toHaveStyle('background-color: green');
	expect($targetEls[2]).toHaveStyle('background-color: green');
});

test('css() - set css values (object)', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0" style="display: inline-block; background-color: red;">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2" style="display: block; background-color: blue;">
			text <a href="#">content 3</a>
		</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	$targetEls.css({
		backgroundColor: 'green',
		display: 'flex'
	});

	expect($targetEls[0]).toHaveStyle({
		backgroundColor: 'green',
		display: 'flex'
	});

	expect($targetEls[1]).toHaveAttribute('style', 'background-color: green; display: flex;');
	expect($targetEls[1]).toHaveStyle({
		backgroundColor: 'green',
		display: 'flex'
	});

	expect($targetEls[2]).toHaveStyle({
		backgroundColor: 'green',
		display: 'flex'
	});
});

test('css() - remove values (string)', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0" style="display: inline-block; background-color: red;">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1" style="display: flex;">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2" style="display: block; background-color: blue;">
			text <a href="#">content 3</a>
		</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	$targetEls.css('display', '');

	expect($targetEls[0]).toHaveAttribute('style', 'background-color: red;');
	expect($targetEls[1]).not.toHaveAttribute('style');
	expect($targetEls[2]).toHaveAttribute('style', 'background-color: blue;');
});

test('css() - remove values (object)', () => {
	document.body.innerHTML = `
	<div id="test-el">
		<p id="target-el" class="target-el" tabindex="0" style="display: inline-block; background-color: red;">
			<span>text content 1</span>
		</p>
	    <div id="target-el-2" class="target-el" tabindex="1">text content 2</div>
	</div>
	<div id="test-el-2">
		<span id="target-el-3" class="target-el" tabindex="2" style="display: block; background-color: blue;">
			text <a href="#">content 3</a>
		</span>
	</div>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	$targetEls.css({
		backgroundColor: '',
		display: ''
	});

	expect($targetEls[0]).not.toHaveAttribute('style');
	expect($targetEls[1]).not.toHaveAttribute('style');
	expect($targetEls[2]).not.toHaveAttribute('style');
});