function PopupWithForm({
	title,
	name,
	buttonText,
	classPopup,
	isOpen,
	onClose,
	onSubmit,
	buttonInactive,
	children,
}) {
	return (
		<div
			className={`popup popup_${classPopup} ${isOpen ? "popup_opened" : ""}`}
		>
			<form
				onSubmit={e => onSubmit(e)}
				name={`form-${name}`}
				className={`popup__form popup__form_type_${name}`}
				noValidate
			>
				<h2 className='popup__title'>{title}</h2>
				{children}
				<button
					type='submit'
					className={`popup__submit ${
						buttonInactive ? "popup__button_disabled" : ""
					}`}
					value={buttonText}
					disabled={buttonInactive ? true : false}
				>
					{buttonText}
				</button>
				<button
					type='button'
					onClick={onClose}
					className='popup__exit'
				></button>
			</form>
		</div>
	);
}
export default PopupWithForm;
