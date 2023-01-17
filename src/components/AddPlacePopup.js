import {useState} from "react";

function AddPlacePopup(props){
    const {
        isOpen,
        onClose,
        onSubmit,
        onAddPlace
    } = props;

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e){
        setName(e.target.value);
    }
    function handleChangeLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(name, link);
    }

    return (
        <div className={`popup popup_type_${onSubmit}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e=>e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose} ></button>
                <form className="popup__form" name={`popup-form-${onSubmit}`} onSubmit={handleSubmit} noValidate>
                    <h3 className="popup__title">Новое место</h3>
                    <input onChange={handleChangeName} type="text" className="popup__input popup__input_type_place" name="name" id="popup-place"
                           placeholder="Название" minLength="2" maxLength="30" required />
                    <span className="popup__error" id="popup-place-error"></span>
                    <input onChange={handleChangeLink} type="url" className="popup__input popup__input_type_url" name="link" id="popup-link"
                           placeholder="Ссылка на картинку" required />
                    <span className="popup__error" id="popup-link-error"></span>
                    <button className="popup__save-btn popup__save-btn_inactive" type="submit">Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddPlacePopup;