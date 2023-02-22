class Auth {
	constructor() {
		this._baseUrl = 'https://api.ivanov-social.nomoredomains.work/';
	}
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
	registration(email, password) {
		return fetch(`${this._baseUrl}signup`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				password: password,
				email: email,
			}),
		}).then(res => this._getResponseData(res));
	}
	autorization(email, password) {
		return fetch(`${this._baseUrl}signin`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				password: password,
				email: email,
			}),
		}).then(res => this._getResponseData(res)); //return jwt  lS set
	}
	checkUsers() {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => this._getResponseData(res));
	}

	logout() {
		return fetch(`${this._baseUrl}users/logout`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => this._getResponseData(res));
	}
}
export const autoriz = new Auth();
