
function EditAvatarPopup(props) {
    const {
        isOpen,
        onClose,
        onSubmit,
        onUpdateAvatar
    } = props;

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            //avatar: /* Значение инпута, полученное с помощью рефа */,
        });
    }

    return (
        <div className={`popup popup_type_${onSubmit}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e=>e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose} ></button>
                <form className="popup__form" name={`popup-form-${onSubmit}`} onSubmit={handleSubmit} noValidate>
                    <h3 className="popup__title">Обновить аватар</h3>
                    <input type="url" className="popup__input popup__input_type_url" name="link"
                           id="popup-avatar-link"
                           placeholder="Ссылка на аватар" required />
                    <span className="popup__error" id="popup-avatar-link-error"></span>
                    <button className="popup__save-btn popup__save-btn_inactive" type="submit">Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditAvatarPopup;