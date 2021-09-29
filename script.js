



// Находим форму в DOM
let formElement = document.querySelector('.form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('#about');// Воспользуйтесь инструментом .querySelector()
let popupEl = document.querySelector('.popup');
let popupCloseEl = popupEl.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  popupEl.classList.add('popup__opened');
  let profileEl = document.querySelector('.profile');
  let currentName = profileEl.querySelector('.profile__name').textContent;
  let currentJob = profileEl.querySelector('.profile__job').textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
});
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let name = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
    let job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileNameEl = document.querySelector('.profile__name');
    let profileJobEl = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileNameEl.textContent = name;
    profileJobEl.textContent = job;
    popupEl.classList.remove('popup__opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

popupCloseEl.addEventListener('click', function() {
  popupEl.classList.remove('popup__opened');
});

let likeEls = document.querySelectorAll('.place__like');
// ДОЖДАТЬСЯ БРИФА И ЗАДАТЬ ВОПРОС
likeEls.forEach((likeEl) => likeEl.addEventListener('click', function() {
  let currentIconPath = likeEl.getAttribute('src');
  if ( currentIconPath === './images/places/like.svg' ) {
    likeEl.setAttribute('src', './images/places/like-active.svg');
  } else {
    likeEl.setAttribute('src', './images/places/like.svg');
  }
}));