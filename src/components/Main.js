
import editPen from '../images/avatar__edit-pen.svg';
import Card from "./Card";

export default function Main({handleEditAvatarClick, handleAddPlaceClick, handleEditProfileClick, handleDeleteCardClick, onCardClick, userName, userDescription, userAvatar, cards}) {
    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__hover" onClick={handleEditAvatarClick} >
                    <div style={{ backgroundImage: `url(${userAvatar})`}} className="profile__avatar"></div>
                    <img src={editPen} alt="Карандаш редактирования" className="profile__edit-pen" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button className="profile__edit-button" type="button" aria-label="кнопка редактирования" onClick={handleEditProfileClick} ></button>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="кнопка добавления" onClick={handleAddPlaceClick}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {
                        cards.map((card) => {
                            return <Card handleDeleteCardClick={handleDeleteCardClick} onCardClick={onCardClick} card={card} key={card._id}/>
                        })
                    }
                </ul>
            </section>
        </main>
    )
}