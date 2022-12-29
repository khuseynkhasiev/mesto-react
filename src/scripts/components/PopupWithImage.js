import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImageInfo, popupFigcaptionImage) {
        super(popupSelector);
        this._popupImageInfo = popupImageInfo;
        this._popupFigcaptionImage = popupFigcaptionImage;
    }
    open(name, link) {
        this._popupImageInfo.src = link;
        this._popupImageInfo.alt = name;
        this._popupFigcaptionImage.textContent = name;
        super.open();
    }
}