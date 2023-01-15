import { useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({card, handleDeleteCardClick, onCardClick}) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    function handleClick() {
        onCardClick(card);
    }
    return (
        <li className="elements__el">

            {isOwn ? (
                <button className="elements__trash elements__trash_visible" type="button"
                        aria-label="кнопка удаления карточки" onClick={handleDeleteCardClick} ></button>
            ) : null}
            <img className="elements__img" onClick={handleClick} alt={card.name} src={card.link}/>
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__counter">
                    <button className="elements__like" type="button"
                            aria-label="кнопка выставления лайка или отмены лайка"></button>
                    <p className="elements__number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}