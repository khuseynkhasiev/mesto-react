import {useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup(props) {
    const {
        isOpen,
        onClose,
        onSubmit,
        onUpdateUser
    } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleChangeDescription(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        //console.log('submit')
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <div className={`popup popup_type_${onSubmit}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e=>e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose} ></button>
                <form className="popup__form" name={`popup-form-${onSubmit}`} onSubmit={handleSubmit} noValidate>
                    <h3 className="popup__title">Редактировать профиль</h3>
                    <input onChange={handleChangeName} type="text" className="popup__input popup__input_type_name" name="name" id="popup-name"
                           placeholder={name} minLength="2" maxLength="40" required />
                    <span className="popup__error" id="popup-name-error"></span>
                    <input onChange={handleChangeDescription} type="text" className="popup__input popup__input_type_about" name="about"
                           id="popup-job"
                           placeholder={description} minLength="2" maxLength="200" required />
                    <span className="popup__error" id="popup-job-error"></span>
                    <button className="popup__save-btn popup__save-btn_inactive" type="submit">Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePopup;