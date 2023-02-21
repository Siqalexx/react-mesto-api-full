import React from "react";
import { currentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
	isOpen,
	onClose,
	handleUpdateUser,
}) {
	const [inputName, setInputName] = React.useState("");
	const [inputDescription, setInputDescription] = React.useState("");
	const [buttonInactive, setButtonInactive] = React.useState(true);
	const [isValidInputName, setValidInputName] = React.useState({
		invalid: false,
		errorText: "",
	});
	const [isValidInputJob, setValidInputJob] = React.useState({
		invalid: false,
		errorText: "",
	});

	const currentUser = React.useContext(currentUserContext);
	React.useEffect(() => {
		setInputName(currentUser.name);
		setInputDescription(currentUser.about);
		setButtonInactive(true);
		setValidInputName({
			invalid: false,
			errorText: "",
		});
		setValidInputJob({
			invalid: false,
			errorText: "",
		});
	}, [isOpen, currentUser]);
	React.useEffect(() => {
		if (!isValidInputName.invalid && !isValidInputJob.invalid) {
			setButtonInactive(false);
		} else setButtonInactive(true);
	}, [isValidInputName, isValidInputJob]);
	function inputValidation(event, setValid) {
		if (event.target.validity.valid) {
			setValid({ invalid: false, errorText: "" });
		} else {
			setValid({ invalid: true, errorText: event.target.validationMessage });
		}
	}
	function handleSubmit(e) {
		e.preventDefault();
		handleUpdateUser({
			name: inputName,
			about: inputDescription,
		});
	}
	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='editing'
			buttonText='Сохранить'
			classPopup='profile'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonInactive={buttonInactive}
			children={
				<>
					<input
						value={inputName}
						onChange={e => {
							setInputName(e.target.value);
							inputValidation(e, setValidInputName);
						}}
						required
						name='input-name'
						minLength='2'
						maxLength='40'
						type='text'
						className={`popup__input popup__input_content_name ${
							isValidInputName.errorText ? "popup__input_type_error" : ""
						}`}
						placeholder='Название вашего аккаунта'
					></input>
					<span
						className={`popup__input-error input-name-error ${
							isValidInputName.errorText ? "popup__input-error_visible" : ""
						}`}
					>
						{isValidInputName.errorText}
					</span>
					<input
						value={inputDescription}
						onChange={e => {
							setInputDescription(e.target.value);
							inputValidation(e, setValidInputJob);
						}}
						required
						name='input-job'
						minLength='2'
						maxLength='200'
						type='text'
						className={`popup__input popup__input_content_job ${
							isValidInputJob.errorText ? "popup__input_type_error" : ""
						}`}
						placeholder='Ваш род деятельности'
					></input>
					<span
						className={`popup__input-error input-job-error ${
							isValidInputJob.errorText ? "popup__input-error_visible" : ""
						}`}
					>
						{isValidInputJob.errorText}
					</span>
				</>
			}
		/>
	);
}
