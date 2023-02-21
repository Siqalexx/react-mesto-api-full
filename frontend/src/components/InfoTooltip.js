import React from "react";
function InfoTooltip({ tooltip, setTooltip }) {
	return (
		<div
			className={`popup popup_profile ${tooltip.isOpen ? "popup_opened" : ""}`}
		>
			<div className='infoTooltip'>
				<div
					className={`infoTooltip__union ${
						!tooltip.isSuccess && "unsuccess-union"
					}`}
				/>
				<h2 className='infoTooltip__title'>{tooltip.textRes}</h2>
				<button
					type='button'
					onClick={() =>
						setTooltip({ isOpen: false, isSuccess: tooltip.isSuccess })
					}
					className='popup__exit'
				></button>
			</div>
		</div>
	);
}

export default InfoTooltip;
