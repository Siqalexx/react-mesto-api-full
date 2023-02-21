import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, handleSubmit }) {
	const [placeTitle, setPlaceTitle] = React.useState("");
	const [placeSrc, setPlaceSrc] = React.useState("");
	const [buttonInactive, setButtonInactive] = React.useState(true);
	const [isValidInputTitle, setValidInputTitle] = React.useState({
		invalid: true,
		errorText: "",
	});
	const [isValidInputImage, setValidInputImage] = React.useState({
		invalid: true,
		errorText: "",
	});
	function onSubmit(e) {
		e.preventDefault(e);
		handleSubmit(placeTitle, placeSrc);
	}
	React.useEffect(() => {
		setPlaceTitle("");
		setPlaceSrc("");
		setButtonInactive(true);
		setValidInputTitle({
			invalid: true,
			errorText: "",
		});
		setValidInputImage({
			invalid: true,
			errorText: "",
		});
	}, [isOpen]);
	React.useEffect(() => {
		if (!isValidInputTitle.invalid && !isValidInputImage.invalid) {
			setButtonInactive(false);
		} else setButtonInactive(true);
	}, [isValidInputTitle, isValidInputImage]);
	function inputValidation(event, setValid) {
		if (event.target.validity.valid) {
			setValid({ invalid: false, errorText: "" });
		} else {
			setValid({ invalid: true, errorText: event.target.validationMessage });
		}
	}
	return (
		<PopupWithForm
			title='Новое место'
			name='added'
			buttonText='Создать'
			classPopup='cards'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
			buttonInactive={buttonInactive}
			children={
				<>
					<input
						value={placeTitle}
						onChange={e => {
							inputValidation(e, setValidInputTitle);
							setPlaceTitle(e.target.value);
						}}
						required
						name='input-title'
						minLength='2'
						maxLength='30'
						type='text'
						className={`popup__input popup__input_content_name ${
							isValidInputTitle.errorText ? "popup__input_type_error" : ""
						}`}
						placeholder='Название'
					></input>
					<span
						className={`popup__input-error input-title-error ${
							isValidInputTitle.errorText ? "popup__input-error_visible" : ""
						}`}
					>
						{isValidInputTitle.errorText}
					</span>
					<input
						value={placeSrc}
						onChange={e => {
							inputValidation(e, setValidInputImage);
							setPlaceSrc(e.target.value);
						}}
						required
						name='input-image'
						type='url'
						className={`popup__input popup__input_content_image ${
							isValidInputImage.errorText ? "popup__input_type_error" : ""
						}`}
						placeholder='Ссылка на картинку'
					></input>
					<span
						className={`popup__input-error input-image-error ${
							isValidInputImage.errorText ? "popup__input-error_visible" : ""
						}`}
					>
						{isValidInputImage.errorText}
					</span>
				</>
			}
		/>
	);
}

export default AddPlacePopup;
