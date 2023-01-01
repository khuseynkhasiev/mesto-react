export default function ImagePopup({ card, onClose }){
    return (
        <div className={`popup popup_type_image popup_opacity ${card ? 'popup_opened' : ''}`} onClick={onClose} >
            <div className="popup__container-image" >
                <figure className="popup__figure">
                    <button className="popup__close" onClick={onClose} type="button"></button>
                    <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
                         alt="Байкал"
                         className="popup__image" onClick={e=>e.stopPropagation()}/>
                    <figcaption className="popup__figcaption"></figcaption>
                </figure>
            </div>
        </div>
    )
}