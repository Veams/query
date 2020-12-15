import '@testing-library/jest-dom';
import $, {VeamsQueryObject} from '../src';

test('serialize() - check results of serialization', () => {
	document.body.innerHTML = `
	<form id="form" action="#">
		<input name="input-text" class="target-el" type="text" value="20">
		<input name="input-number" class="target-el" type="number" value="40">
		<select name="select">
			<option value="option-1">Option 1</option>
			<option value="option-2" selected>Option 2</option>
			<option value="option-3">Option 3</option>
		</select>
		<input type="checkbox" name="checkbox">
		<input type="radio" name="radio[]" value="radio-1">
		<input type="radio" name="radio[]" value="radio-2">
		<input type="radio" name="radio[]" value="radio-3">
		<textarea name="textarea">
			textarea-content
		</textarea>
	</form>`;

	const $form: VeamsQueryObject = $(document.getElementById('form'));
	const serializedString = $form.serialize();

	expect(serializedString).toBe('input-text=20&input-number=40&select=option-2&textarea=textarea-content');
});