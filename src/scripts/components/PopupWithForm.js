import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

    constructor({
        handleFormSubmit
    }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this.popupSelector.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._buttonName = this.popupSelector.querySelector('.popup__save-btn');
    }
    // собираем данные с инпутов формы
    _getInputValues = () => {
        this._inputValues = {}
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    // замыкание
    changeSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }

    // отменяем стандартную отправку, добавляем методы класса
    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    _setEventListeners() {
        super._setEventListeners();


        // ставим слушатель на сабмит
        this._form.addEventListener('submit', this._handleSubmit);
    }

    // удаление слушаталей
    _removeEventListeners() {
        super._removeEventListeners();
        this._form.removeEventListener('submit', this._handleSubmit);
    }
    close() {
        super.close();
        setTimeout(() => {
            this._form.reset()
        }, 500)
    }
}