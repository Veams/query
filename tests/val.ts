import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('val() - get value', () => {
	document.body.innerHTML = `
	<form action="#">
		<input class="target-el" type="text" value="20">
		<input class="target-el" type="text" value="40">
	</form>`;

	const $targetEls: VeamsQueryObject = $('.target-el');
	const val = $targetEls.val();

	expect($targetEls).toHaveLength(2);
	expect(val).toBe('20');
});

test('val() - set value', () => {
	document.body.innerHTML = `
	<form action="#">
		<input class="target-el" type="text" value="20">
		<input class="target-el" type="number" value="40">
	</form>`;

	const $targetEls: VeamsQueryObject = $('.target-el');

	$targetEls.val(30);

	expect($targetEls).toHaveLength(2);
	expect($targetEls[0]).toHaveValue('30');
	expect($targetEls[1]).toHaveValue(30);
});