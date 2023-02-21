import React, { useContext } from "react";
import { currentUserContext } from "../context/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
	cards,
	onCardLike,
	onCardDelete,
	onCardClick,
	onEditProfile,
	onAddPlace,
	onEditAvatar,
}) {
	const currentUser = useContext(currentUserContext);

	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__block'>
					<div className='profile__container'>
						<img
							src={currentUser.avatar}
							alt='Аватар'
							onClick={onEditAvatar}
							className='profile__avatar'
						></img>
					</div>
					<div className='profile__info'>
						<h1 className='profile__title'>{currentUser.name}</h1>
						<button
							type='button'
							onClick={onEditProfile}
							className='profile__button-edit'
						></button>
						<p className='profile__subtitle'>{currentUser.about}</p>
					</div>
				</div>
				<button
					type='button'
					onClick={onAddPlace}
					className='profile__add-button'
				></button>
			</section>
			<section className='elements'>
				{cards.map(card => (
					<Card
						key={card.idCard} // card.idCard - Это айди карточки, а не ее индекс
						card={card}
						cardClick={onCardClick}
						onCardLike={onCardLike}
						onCardDelete={onCardDelete}
					/>
				))}
			</section>
		</main>
	);
}

export default Main;
