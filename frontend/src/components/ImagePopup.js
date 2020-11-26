import React from 'react';
import { Link } from 'react-router-dom';

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup__photo ${card.onShow ? "popup_opened" : ""}`}>
            <figure className="popup__photo-container container">      
                <Link to="/" className="popup__close-button popup__photo_type_close-button" onClick={onClose} type="button"></Link>
                <img className="popup__img" src={card.link} alt={card.name} />
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;