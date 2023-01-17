function DeleteCardPopup(props){
    const {
        isOpen,
        onClose,
        onSubmit,
    } = props;

    return (
        <div className={`popup popup_type_${onSubmit}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e=>e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose} ></button>
                <form className="popup__form" name={`popup-form-${onSubmit}`} noValidate>
                    <h3 className="popup__title">Вы уверены?
                    </h3>
                    <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                            disabled>Да
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DeleteCardPopup;