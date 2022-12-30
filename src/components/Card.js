
export default function Card({card}) {
    return (
        <li className="elements__el">
            <button className="elements__trash elements__trash_visible" type="button"
                    aria-label="кнопка удаления карточки"></button>
            <img className="elements__img" style={{backgroundImage: `url(${card.link})`}}/>
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