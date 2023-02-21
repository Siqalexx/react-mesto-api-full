import React from "react";
import { Link } from "react-router-dom";
function FormIn({
	title,
	name,
	buttonText,
	onSubmit,
	buttonInactive,
	children,
}) {
	return (
		<form onSubmit={e => onSubmit(e)} name={`form-${name}`} noValidate>
			<h2 className='popup__title popup__title_formIn'>{title}</h2>
			{children}
			<button
				type='submit'
				className={`popup__submit popup__submit_formIn ${
					buttonInactive ? "popup__button_disabled" : ""
				}`}
				value={buttonText}
				disabled={buttonInactive ? true : false}
			>
				{buttonText}
			</button>
			{name === "signup" && (
				<Link className='formIn__under-button' to='/signin'>
					Уже зарегистрированы? Войти
				</Link>
			)}
		</form>
	);
}

export default FormIn;
