//необходимые элементы
const editFormElement = document.querySelector('.edit-form'); //форма для изменения профиля
const addFormElement = document.querySelector('.add-form'); //форма для добавления карточки

const nameInput = editFormElement.querySelector('.form__input_type_profile-name'); // элемент формы "ввод имени"
const jobInput = editFormElement.querySelector('.form__input_type_profile-job'); //элемент формы "ввод работы"

const placeNameInput = addFormElement.querySelector('.form__input_type_place-name'); //элемент ввода названия места
const placeUrlInput = addFormElement.querySelector('.form__input_type_place-url'); //элемент ввода ссылка на фото места

const profileElement = document.querySelector('.profile'); //элемент профиль
const profileNameElement = profileElement.querySelector('.profile__name'); // элемент содержащий имя профиля
const profileJobElement = profileElement.querySelector('.profile__job'); // элемент содержащий место работы профиля
const profileEditBtn = profileElement.querySelector('.profile__edit-button'); //кнопка изменения профиля

const cardsAddBtn = profileElement.querySelector('.profile__add-button'); //кнопка добавления карточки

const popupEditElement = document.querySelector('.popup-edit'); //элемент попап редактирования профиля
const popupEditSubmitButton = popupEditElement.querySelector('.form__submit'); 
const popupAddElement = document.querySelector('.popup-add'); //элемент попап добавления карточки
const popupImgElement = document.querySelector('.img-popup'); //попап с картинкой нажатой карточки
const imgElement = popupImgElement.querySelector('.popup__img'); //картинка в попапе
const imgTitleElement = popupImgElement.querySelector('.popup__img-subtitle'); //подпись к картинке
const popupCloseBtns = document.querySelectorAll('.popup__close-button'); //кнопка закрытия попапа

const placeBlankElement = document.querySelector('.place-blank').content;  //шаблон для карточки
 
const placeListElements = document.querySelector('.places__list');   //список в который вставлять карточки

//необходимые функции и обработчики
function openPopup(el) {                           //функция открывающая попап
  el.classList.add('popup_opened');
  el.addEventListener('keydown', closePopupByEsc);
  el.addEventListener('click', closePopupByClickingOverlay);
}
function closePopup() {                                                //функция закрывающая попап
  const openedPopup = document.querySelector('.popup_opened');          //нашел текущий открытый попап
  openedPopup && openedPopup.classList.remove('popup_opened');          //если такой попап !== undefined (т.е. существует), то закрыть его 
  openedPopup.removeEventListener('keydown', closePopupByEsc);
  openedPopup.removeEventListener('click', closePopupByClickingOverlay);
}
function closePopupByClickingOverlay(evt) {
  evt.target.classList.contains('popup_opened') && closePopup();
}
function closePopupByEsc(evt) {
  (evt.key === "Escape") && closePopup();
}

function makeButtonActive(buttonElement) {
  buttonElement.classList.contains('form__submit_inactive') && buttonElement.classList.remove('form__submit_inactive');
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup(popupEditElement);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  hideInputError(popupEditElement, jobInput, { inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active' });
  hideInputError(popupEditElement, nameInput, { inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active' });
  makeButtonActive(popupEditSubmitButton);
}
function editFormSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

function addPlaceCard(el) {                                        
  placeListElements.prepend(el);
}
function createCardElement( name, link ) {                                //создает и возвращает новую карточку
  const placeCardElement = placeBlankElement.cloneNode(true);                    //и функционал кнопок
  const photoElement = placeCardElement.querySelector('.place__img');
  const titleElement = placeCardElement.querySelector('.place__name');
  const likeBtn = placeCardElement.querySelector('.place__like-button');
  const removeBtn = placeCardElement.querySelector('.place__remove-button');
  
  likeBtn.addEventListener('click', likeChangeHandler);
  removeBtn.addEventListener('click', removePlaceHandler);
  photoElement.addEventListener('click', openImgPopupHandler);

  photoElement.src = link;
  titleElement.textContent = name;
  photoElement.alt = name;

  return placeCardElement;
}

function cardsAddHandler() {                //функция хендлер сработающая при нажатии на кнопку +
  openPopup(popupAddElement);
}
function addFormSubmitHandler(evt) {        //хендлер по добавлению нового места в список
  evt.preventDefault();                     
  const newCardPlace = createCardElement( placeNameInput.value, placeUrlInput.value );
  addPlaceCard( newCardPlace );
  placeNameInput.value = '';
  placeUrlInput.value = '';
  closePopup();
}

function changeLikeState(el) {                         //ф-ция меняет состояние лайка 
  el.classList.toggle('place__like-button_active');
}
function likeChangeHandler(evt) {                       //handler для кнопки лайк
  changeLikeState(evt.target); 
}

function removePlaceHandler(evt) {                    //хендлер для кнопки remove, удаляет карточку
  evt.target.parentElement.remove();                   // заменить parent на closest ?
}

function openImgPopupHandler(evt) {                   //хендлер для открытия попапа с картинкой
  openPopup(popupImgElement);
  const placeName = evt.target.nextElementSibling.textContent;
  const placeUrl = evt.target.src;
  imgElement.setAttribute('src', placeUrl);
  imgElement.setAttribute('alt', placeName);
  imgTitleElement.textContent = placeName;
}

function renderCards(cards) {
  cards.forEach(card => {
    const newPlaceCard = createCardElement( card.name, card.link );
    addPlaceCard(newPlaceCard);
  });
}

//функционал кнопок через event listener
profileEditBtn.addEventListener('click', profileEditHandler);
cardsAddBtn.addEventListener('click', cardsAddHandler);
popupCloseBtns.forEach(popupCloseBtn => popupCloseBtn.addEventListener('click', closePopup));

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

renderCards(initialCards); //отрисовывает дефолтные карточки