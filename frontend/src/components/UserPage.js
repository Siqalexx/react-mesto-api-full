import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import { Link } from 'react-router-dom';
function UserPage({
	userData,
	cards,
	handleCardLike,
	handleCardDelete,
	handleCardClick,
	handleEditProfileClick,
	handleAddPlaceClick,
	handleEditAvatarClick,
	logout,
}) {
	//решил оставить userPage, чтобы выделить основную часть страницы, как отдельный компонент
	return (
		<>
			<Header email={userData.email}>
				<Link
					className='header__link  header__link_userPage'
					to='/signin'
					onClick={() => {
						logout();
						localStorage.removeItem('jwt');
					}}
				>
					Выйти
				</Link>
			</Header>
			<Main
				cards={cards}
				onCardLike={handleCardLike}
				onCardDelete={handleCardDelete}
				onCardClick={handleCardClick}
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
			/>
			<Footer />
		</>
	);
}

export default UserPage;
