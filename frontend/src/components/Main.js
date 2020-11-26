import React from 'react';
import Card from '../components/Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, handleCardLike, handleCardDelete }) {

    const UserData = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-img" alt="Аватар" src={UserData.avatar} />
                    <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{UserData.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                    <p className="profile__subtitle">{UserData.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>

            <section className="places">
                <ul className="place__container">
                    {cards.map((card) => 
                        <Card 
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onLikeClick={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;