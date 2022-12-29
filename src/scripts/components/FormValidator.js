export default class FormValidator {
  constructor(popup, validationConfig) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._popup = popup;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll(this._inputSelector));
    this._buttonElement = this._popup.querySelector(this._submitButtonSelector);
  }

  // метод принимает массив полей
  _hasInvalidInput = (inputList => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  })

  // метод очистки ошибок и деактивации кнопки
  resetForm() {
    if (this._popup.contains(this._popupForm)) {

      // очищаем/скрываем ошибки инпутов
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      })

      // Деативурем кнопку отправки в текущей форме
      this._toggleButtonState();
    }
  }

  //скрытие ошибки
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorSpan = this._popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorSpan.textContent = '';
  }

  // отображение ошибки
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorSpan = this._popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorSpan.textContent = errorMessage;
  }

  // проверка на валидацию поля инпута
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // находим все инпуты массива
  _setEventListeners = () => {

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      })
    })
  }
  enableValidation = () => {
    this._setEventListeners();
  }
}