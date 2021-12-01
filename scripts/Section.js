//отвечает за отрисовку элементов
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(el, position = 'end') {
    position === 'end'
      ? this._container.append(el)
      : this._container.prepend(el);
  }
}