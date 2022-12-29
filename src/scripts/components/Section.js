export default class Section {
    constructor({
        items,
        renderer
    }, container) {
        this._items = items,
            this._renderer = renderer,
            this._container = document.querySelector(container)
    }

    //перебор карточек из массива объектов
    renderItems() {
        this._items.reverse().forEach((item) => this._renderer(item))
    }

    //добавление карточки в начало
    addItem(itemHtml) {
        this._container.prepend(itemHtml);
    }
}