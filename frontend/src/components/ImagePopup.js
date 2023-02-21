function ImagePopup(props) {
	return (
		<div className={`popup popup_photos ${props.card ? "popup_opened" : ""}`}>
			<div className='popup__photo'>
				<img
					src={props.infoCard.src}
					alt={props.infoCard.title}
					className='popup__image'
				></img>
				<h2 className='popup__image-name'>{props.infoCard.title}</h2>
				<button
					type='button'
					onClick={props.onClose}
					className='popup__exit'
				></button>
			</div>
		</div>
	);
}
export default ImagePopup;
