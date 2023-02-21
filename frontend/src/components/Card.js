import { currentUserContext } from "../context/CurrentUserContext";
import React from "react";

function Card({ card, cardClick, onCardLike, onCardDelete }) {
	const currentUser = React.useContext(currentUserContext);
	const isOwner = card.ownerId === currentUser.id ? true : false;
	const isLiked = card.likes.some(id => {
		return id._id === currentUser.id;
	});
	return (
		<div className='element'>
			<img
				src={card.src}
				onClick={() => cardClick(card)}
				alt={card.title}
				className='element__image'
			/>
			<div className='element__info'>
				<h2 className='element__title'>{card.title}</h2>
				<div className='element__place'>
					<button
						type='button'
						className={`element__like ${isLiked ? "element__like_active" : ""}`}
						onClick={() => onCardLike(card)}
					></button>
					<h3 className='element__number'>{card.likes.length}</h3>
				</div>
			</div>
			<button
				type='button'
				className={`element__delete ${isOwner ? "element__delete_active" : ""}`}
				onClick={() => onCardDelete(card)}
			></button>
		</div>
	);
}
export default Card;
