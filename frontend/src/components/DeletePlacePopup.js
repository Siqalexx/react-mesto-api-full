import React from "react";
import PopupWithForm from "./PopupWithForm";
function DeletePlacePopup({ isOpen, onClose, onSubmit }) {
	return (
		<PopupWithForm
			title='Вы уверены?'
			name='delete'
			buttonText='Да'
			classPopup='delete'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
			children={<></>}
		/>
	);
}

export default DeletePlacePopup;
