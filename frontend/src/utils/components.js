export {
	obj,
	elements,
	popupEditButton,
	popupAddButton,
	popupProfile,
	popupCards,
	nameEditInput,
	jobEditInput,
	removePreload,
	profileAvatar,
	buttonDelete,
	popupAvatar,
};

const obj = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	inputErrorText: ".popup__input-error",
	errorClass: "popup__input-error_visible",
	formEditingElement: ".popup__form_type_editing",
	nameEditInput: ".popup__input_content_name",
	jobEditInput: ".popup__input_content_job",
};

const elements = document.querySelector(".elements"); //куда добавлять карточки
const popupEditButton = document.querySelector(".profile__button-edit");
const popupAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar");
const popupProfile = document.querySelector(".popup_profile");
const popupAvatar = document.querySelector(".popup_avatar");
const popupCards = document.querySelector(".popup_cards");
const formEditingElement = document.querySelector(obj.formEditingElement);
const nameEditInput = formEditingElement.querySelector(obj.nameEditInput);
const jobEditInput = formEditingElement.querySelector(obj.jobEditInput);
const buttonDelete = document.querySelector(".element__delete");
const removePreload = () => {
	const bodyPreload = document.querySelector(".body");
	bodyPreload.classList.remove("preload");
};
