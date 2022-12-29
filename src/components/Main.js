
import preloader from '../images/preloader2.gif';
import editPen from '../images/avatar__edit-pen.svg';
export default function Main({handleEditAvatarClick, handleAddPlaceClick, handleEditProfileClick}) {
    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__hover" onClick={handleEditAvatarClick} >
                   <img src={preloader} alt="Аватарка" className="profile__avatar" />
                    <img src={editPen} alt="Карандаш редактирования" className="profile__edit-pen" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title"></h1>
                    <button className="profile__edit-button" type="button" aria-label="кнопка редактирования" onClick={handleEditProfileClick} ></button>
                    <p className="profile__job"></p>
                </div>
                <button className="profile__add-button" type="button" aria-label="кнопка добавления" onClick={handleAddPlaceClick}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                </ul>
            </section>
        </main>
    )
}