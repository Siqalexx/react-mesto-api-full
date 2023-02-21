import React from "react";
import FormIn from "./FormIn";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
	const [inputEmail, setInputEmail] = React.useState("");
	const [inputPassword, setInputPassword] = React.useState("");

	//validation
	const [buttonInactive, setButtonInactive] = React.useState(true);
	const [isValidInputEmail, setValidInputEmail] = React.useState({
		invalid: true,
		errorText: "",
	});
	const [isValidInputPassword, setValidInputPassword] = React.useState({
		invalid: true,
		errorText: "",
	});

	React.useEffect(() => {
		if (!isValidInputEmail.invalid && !isValidInputPassword.invalid) {
			setButtonInactive(false);
		} else setButtonInactive(true);
	}, [isValidInputEmail, isValidInputPassword]);
	React.useEffect(() => {
		setButtonInactive(true);
	}, []);
	function inputValidation(event, setValid) {
		if (event.target.validity.valid) {
			setValid({ invalid: false, errorText: "" });
		} else {
			setValid({ invalid: true, errorText: event.target.validationMessage });
		}
	}
	function handleSubmit(e) {
		e.preventDefault();
		onRegister(inputEmail, inputPassword);
	}
	return (
		<>
			<Header>
				<Link className='header__link ' to='/signin'>
					Войти
				</Link>
			</Header>
			<FormIn
				title='Регистрация'
				name='signup'
				buttonText='Зарегистрироваться'
				onSubmit={handleSubmit}
				buttonInactive={buttonInactive}
				children={
					<>
						<div style={{ margin: "0 auto", width: "358px" }}>
							{"просто для опыта попробовал указать в атрибуте style "}
							<input
								value={inputEmail}
								onChange={e => {
									setInputEmail(e.target.value);
									inputValidation(e, setValidInputEmail);
								}}
								required
								name='input-email'
								minLength='2'
								maxLength='40'
								type='email'
								className={`popup__input popup__input_formIn ${
									isValidInputEmail.errorText ? "popup__input_type_error" : ""
								}`}
								placeholder='Email'
							></input>
							<span
								className={`popup__input-error  ${
									isValidInputEmail.errorText
										? "popup__input-error_visible"
										: ""
								}`}
							>
								{isValidInputEmail.errorText}
							</span>
						</div>
						<div style={{ margin: "0 auto", width: "358px" }}>
							<input
								value={inputPassword}
								onChange={e => {
									setInputPassword(e.target.value);
									inputValidation(e, setValidInputPassword);
								}}
								required
								name='input-password'
								minLength='2'
								maxLength='200'
								type='password'
								className={`popup__input popup__input_formIn ${
									isValidInputPassword.errorText
										? "popup__input_type_error"
										: ""
								}`}
								placeholder='Пароль'
							></input>
							<span
								className={`popup__input-error  ${
									isValidInputPassword.errorText
										? "popup__input-error_visible"
										: ""
								}`}
							>
								{isValidInputPassword.errorText}
							</span>
						</div>
					</>
				}
			/>
		</>
	);
}

export default Register;
