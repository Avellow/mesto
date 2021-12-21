//отвечает за отрисовку элементов
export default class Section {
  constructor({ renderer }, containerSelector) {

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  renderItem(item) {
    this._renderer(item, 'start');
  }

  addItem(el, position = 'end') {
    position === 'end'
      ? this._container.append(el)
      : this._container.prepend(el);
  }
}