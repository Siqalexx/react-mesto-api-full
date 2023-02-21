import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, handleUpdateUser }) {
	function handleSubmit(e) {
		e.preventDefault();
		setButtonInactive(true);
		handleUpdateUser(src.current.value);
		src.current.value = "";
	}
	const [errorText, setErrorText] = React.useState("");
	const [buttonInactive, setButtonInactive] = React.useState(true);
	const [isValid, setValid] = React.useState(false);
	const src = useRef();
	function inputValidation(e) {
		setErrorText(e.target.validationMessage);
		if (!e.target.validity.valid) {
			setValid(true);
			setButtonInactive(true);
		} else {
			setValid(false);
			setButtonInactive(false);
		}
	}
	React.useEffect(() => {
		src.current.value = "";
		setButtonInactive(true);
		setErrorText("");
		setValid(false);
	}, [isOpen]);
	// function handleValidation() {
	// 	valid(e,error,border,visible)
	// }
	return (
		<PopupWithForm
			title='Обновить аватар'
			name='avatar'
			buttonText='Сохранить'
			classPopup='avatar'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonInactive={buttonInactive}
			children={
				<>
					<input
						ref={src}
						required
						onChange={inputValidation}
						name='input-image'
						type='url'
						className={`popup__input popup__input_content_image ${
							isValid ? "popup__input_type_error" : ""
						}`}
						placeholder='Ссылка на аватар'
					></input>
					<span
						className={`popup__input-error input-image-error ${
							isValid ? "popup__input-error_visible" : ""
						}`}
					>
						{errorText}
					</span>
				</>
			}
		/>
	);
}

export default EditAvatarPopup;
