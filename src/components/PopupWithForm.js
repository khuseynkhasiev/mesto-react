

export default function PopupWithForm({title, name, isOpen, onClose}){
    return (
            <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
                <div className="popup__container" onClick={e=>e.stopPropagation()}>
                    <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose} ></button>
                    <form className="popup__form" name={`popup-form-${name}`} noValidate>
                        <h3 className="popup__title">{title}</h3>
                        <input type="text" className="popup__input popup__input_type_name" name="name" id="popup-name"
                               placeholder="Имя" minLength="2" maxLength="40" required />
                        <span className="popup__error" id="popup-name-error"></span>
                        <input type="text" className="popup__input popup__input_type_about" name="about"
                               id="popup-job"
                               placeholder="О себе" minLength="2" maxLength="200" required />
                        <span className="popup__error" id="popup-job-error"></span>
                        <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                                disabled>Сохранить
                        </button>
                    </form>
                </div>
            </div>
/*            <div className="popup popup_type_add">
                <div className="popup__container">
                    <button className="popup__close" type="button"></button>
                    <form className="popup__form" name="popup-form-add">
                        <h3 className="popup__title">Новое место</h3>
                        <input type="text" className="popup__input popup__input_type_place" name="name" id="popup-place"
                               placeholder="Название" minLength="2" maxLength="30" required />
                        <span className="popup__error" id="popup-place-error"></span>
                        <input type="url" className="popup__input popup__input_type_url" name="link" id="popup-link"
                               placeholder="Ссылка на картинку" required />
                        <span className="popup__error" id="popup-link-error"></span>
                        <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                                disabled>Создать
                        </button>
                    </form>
                </div>
            </div>
            <div className="popup popup_type_delete">
                <div className="popup__container">
                    <button className="popup__close" type="button" aria-label="кнопка закрытия"></button>
                    <form className="popup__form" name="popup-form-delete" noValidate>
                        <h3 className="popup__title popup__title_theme_delete">Вы уверены?</h3>
                        <button className="popup__save-btn popup__save-btn_theme_delete" type="submit">Да</button>
                    </form>
                </div>
            </div>
            <div className="popup popup_type_avatar">
                <div className="popup__container">
                    <button className="popup__close" type="button"></button>
                    <form className="popup__form" name="popup-form-add">
                        <h3 className="popup__title">Обновить аватар</h3>
                        <input type="url" className="popup__input popup__input_type_url" name="link"
                               id="popup-avatar-link"
                               placeholder="Ссылка на аватар" required />
                        <span className="popup__error" id="popup-avatar-link-error"></span>
                        <button className="popup__save-btn popup__save-btn_inactive popup__save-btn_theme_avatar"
                                type="submit"
                                disabled>Сохранить
                        </button>
                    </form>
                </div>
            </div>*/

    )
}