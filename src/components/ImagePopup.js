export default function ImagePopup(){
    return (
        <div className="popup popup_type_image popup_opacity">
            <div className="popup__container-image">
                <figure className="popup__figure">
                    <button className="popup__close" type="button"></button>
                    <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
                         alt="Байкал"
                         className="popup__image" />
                    <figcaption className="popup__figcaption"></figcaption>
                </figure>
            </div>
        </div>
    )
}