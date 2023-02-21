import React, { useEffect, useState } from 'react';
import Login from './Login';
import UserPage from './UserPage';
import Register from './Register';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { autoriz } from '../utils/Auth';
import ProtectdRoute from './ProtectedRoute';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import { currentUserContext } from '../context/CurrentUserContext';

function App() {
	const history = useHistory();
	//сделать логигу запросов после регистрации и авторизации
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState({
		email: '',
	});
	const [tooltip, setTooltip] = useState({
		isOpen: false,
		isSuccess: false,
		textRes: '',
	});
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
	const [isPhotoPopupOpen, setPhotoPopupOpen] = useState(false);
	//info
	const [infoCard, setInfoCard] = useState({});
	const [cards, setCards] = useState([]);
	const [cardDelete, setCardDelete] = React.useState({}); //не смог придумать, как правильно передать инфу об удаленной карточке в самбит попапа удаления, пришлось писать костыль
	const [currentUser, setCurrentUser] = React.useState({
		name: '',
		about: '',
		avatar: '',
		id: '',
	});

	function getInfo() {
		api
			.getInfoProfile()
			.then(res => {
				setCurrentUser({
					name: res.name,
					about: res.about,
					avatar: res.avatar,
					id: res._id,
				});
			})
			.catch(err => {
				console.log(err);
			});
		api
			.getInitialCards()
			.then(initialCards => {
				setCards(
					initialCards.map(item => ({
						src: item.link,
						title: item.name,
						ownerId: item.owner._id,
						likes: item.likes,
						idCard: item._id,
					}))
				);
			})
			.catch(err => {
				console.log(err);
			});
	}

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			autoriz
				.checkUsers()
				.then(data => {
					if (data) {
						localStorage.setItem('jwt', 'cookie is download');
						setUserData({
							_id: data._id,
							email: data.email,
						});
						setLoggedIn(true);
						getInfo();
						history.push('/user/me');
					} else {
						history.push('/signin');
					}
				})
				.catch(err => console.log(err));
		}
		// eslint-disable-next-line
	}, []);

	function handleLogin(inputEmail, inputPassword) {
		autoriz
			.autorization(inputEmail, inputPassword)
			.then(data => {
				if (data) {
					setUserData({
						email: inputEmail,
					});
					setLoggedIn(true);
					localStorage.setItem('jwt', 'cookie is download');
					getInfo();
					history.push('/user/me');
				}
			})
			.catch(err => {
				setTooltip({
					isOpen: true,
					isSuccess: false,
					textRes: 'Что-то пошло не так!Попробуйте ещё раз.',
				});
				console.log(err);
			});
	}
	function handleRegister(inputEmail, inputPassword) {
		autoriz
			.registration(inputEmail, inputPassword)
			.then(data => {
				if (data) {
					setUserData({ email: data.email });
					history.push('/signin');
					setTooltip({
						isOpen: true,
						isSuccess: true,
						textRes: 'Вы успешно зарегистрировались!',
					});
				}
			})
			.catch(err => {
				history.push('/signin');
				setTooltip({
					isOpen: true,
					isSuccess: false,
					textRes: 'Что-то пошло не так!Попробуйте ещё раз.',
				});
			});
	}
	////
	////
	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser.id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api
			.changeLikeCardStatus(card.idCard, !isLiked)
			.then(newCard => {
				setCards(cards => {
					return cards.map(card => {
						return card.idCard === newCard._id
							? {
									src: newCard.link,
									title: newCard.name,
									ownerId: newCard.owner._id,
									likes: newCard.likes,
									idCard: newCard._id,
							  }
							: card;
					});
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	//
	function closeAllPopups() {
		setEditAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setPhotoPopupOpen(false);
		setDeletePlacePopupOpen(false);
	}

	function handleCardClick(card) {
		setPhotoPopupOpen(!isPhotoPopupOpen);
		setInfoCard(card);
	}
	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}
	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}
	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}
	function handleDeletePlaceClick() {
		setDeletePlacePopupOpen(true);
	}
	function handleUpdateUser(user) {
		api
			.setProfileInfo({
				'input-name': user.name,
				'input-job': user.about,
			})
			.then(() => {
				setCurrentUser({
					name: user.name,
					about: user.about,
					avatar: currentUser.avatar,
					id: currentUser.id,
				});
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			});
	}
	function handleUpdateAvatar(src) {
		api
			.setNewAvatar(src)
			.then(() => {
				setCurrentUser({
					name: currentUser.name,
					about: currentUser.about,
					avatar: src,
					id: currentUser.id,
				});
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			});
	}
	function handleAddPlaceSubmit(title, src) {
		api
			.addNewCard({ 'input-title': title, 'input-image': src })
			.then(res => {
				setCards([
					{
						src: res.link,
						title: res.name,
						ownerId: res.owner,
						likes: res.likes,
						idCard: res._id,
					},
					...cards,
				]);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			});
	}
	function handleCardDelete(delCard) {
		handleDeletePlaceClick();
		setCardDelete(delCard);
	}
	function handleDeletePlaceSubmit(e) {
		e.preventDefault();
		api
			.removeCard(cardDelete.idCard)
			.then(() => {
				setCards(cards => {
					return cards.filter(card => {
						return card.idCard !== cardDelete.idCard;
					});
				});
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			});
	}

	function logout() {
		autoriz.logout();
	}

	///
	///
	return (
		<currentUserContext.Provider value={currentUser}>
			<div className='App'>
				<div className='page'>
					<Switch>
						<ProtectdRoute
							exact
							path='/user/me'
							component={UserPage}
							loggedIn={loggedIn}
							email={userData}
							currentUser={currentUser}
							cards={cards}
							handleCardLike={handleCardLike}
							handleCardDelete={handleCardDelete}
							handleCardClick={handleCardClick}
							handleEditProfileClick={handleEditProfileClick}
							handleAddPlaceClick={handleAddPlaceClick}
							handleEditAvatarClick={handleEditAvatarClick}
							logout={logout}
						/>
						<Route path='/signup'>
							<Register
								userData={setUserData}
								setTooltip={setTooltip}
								onRegister={handleRegister}
							/>
						</Route>
						<Route path='/signin'>
							<Login
								setUserData={setUserData}
								userData={userData}
								setLoggedIn={setLoggedIn}
								tooltip={tooltip}
								setTooltip={setTooltip}
								onLogin={handleLogin}
							/>
						</Route>
						<Route path='*'>
							<Redirect to='/signin'></Redirect>
						</Route>
					</Switch>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						handleUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						handleSubmit={handleAddPlaceSubmit}
					/>
					<DeletePlacePopup
						isOpen={isDeletePlacePopupOpen}
						onClose={closeAllPopups}
						onSubmit={handleDeletePlaceSubmit}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						handleUpdateUser={handleUpdateAvatar}
					/>
					<ImagePopup
						card={isPhotoPopupOpen}
						infoCard={infoCard}
						onClose={closeAllPopups}
					/>
				</div>
				/
			</div>
		</currentUserContext.Provider>
	);
}

export default App;
