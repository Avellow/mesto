(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o=e.name,i=e.link;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=o,this._link=i,this._cardSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.cloneNode(!0)}},{key:"_handleRemoveCard",value:function(e){e.target.closest(".place").remove()}},{key:"_handleChangeLikeState",value:function(e){e.target.classList.toggle("place__like-button_active")}},{key:"_setEventListeners",value:function(){this._imgElement.addEventListener("click",this._handleCardClick),this._removeBtnElement.addEventListener("click",this._handleRemoveCard),this._likeBtnElement.addEventListener("click",this._handleChangeLikeState)}},{key:"generateCard",value:function(){return this._cardElement=this._getTemplate(),this._imgElement=this._cardElement.querySelector(".place__img"),this._removeBtnElement=this._cardElement.querySelector(".place__remove-button"),this._likeBtnElement=this._cardElement.querySelector(".place__like-button"),this._imgElement.src=this._link,this._imgElement.alt=this._name,this._cardElement.querySelector(".place__name").textContent=this._name,this._setEventListeners(),this._cardElement}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=document.querySelector(n),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._buttonElement=this._form.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"_showInputError",value:function(e,t){var n=this._form.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,n=[{key:"renderItems",value:function(){this._items.forEach(this._renderer)}},{key:"addItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"end";"end"===t?this._container.append(e):this._container.prepend(e)}}],n&&o(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),l(this,"_handleBtnClose",(function(){n.close()})),l(this,"_handleOverlayClose",(function(e){e.target.classList.contains("popup_opened")&&n.close()})),this._popupElement=document.querySelector(t),this._popupCloseBtn=this._popupElement.querySelector(".popup__close-button")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),this._popupElement.focus(),this.setEventListeners()}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),this._removeEventListeners()}},{key:"setEventListeners",value:function(){this._popupElement.addEventListener("keydown",this._handleEscClose),this._popupCloseBtn.addEventListener("click",this._handleBtnClose),this._popupElement.addEventListener("click",this._handleOverlayClose)}},{key:"_removeEventListeners",value:function(){this._popupElement.removeEventListener("keydown",this._handleEscClose),this._popupCloseBtn.removeEventListener("click",this._handleBtnClose),this._popupElement.removeEventListener("click",this._handleOverlayClose)}}])&&a(t.prototype,n),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},p.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function m(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _(e)}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function a(e,t){var n,r,o,l;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),l=function(e){e.preventDefault();var t=n._getInputValues();n._handleFormSubmit(t)},(o="_submittingFormCallback")in(r=_(n=i.call(this,t)))?Object.defineProperty(r,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[o]=l,n._handleFormSubmit=e,n._form=n._popupElement.querySelector(".form"),n._inputElements=Array.from(n._popupElement.querySelectorAll(".form__input")),n._inputNameElement=n._inputElements.find((function(e){return e.name.includes("username")})),n._inputJobElement=n._inputElements.find((function(e){return e.name.includes("job")})),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputElements.forEach((function(t){e[t.name]=t.value})),e}},{key:"_deleteCurrentValues",value:function(){this._inputElements.forEach((function(e){return e.value=""}))}},{key:"close",value:function(){p(d(a.prototype),"close",this).call(this),this._deleteCurrentValues(),this._form.removeEventListener("submit",this._submittingFormCallback)}},{key:"setInputUserValues",value:function(e){var t=e.username,n=e.job;this._inputNameElement&&(this._inputNameElement.value=t),this._inputJobElement&&(this._inputJobElement.value=n)}},{key:"setEventListeners",value:function(){p(d(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._submittingFormCallback)}}])&&c(t.prototype,n),a}(s);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function C(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imgElement=t._popupElement.querySelector(".popup__img"),t._imgTitleElement=t._popupElement.querySelector(".popup__img-subtitle"),t}return t=a,(n=[{key:"_setImageData",value:function(e,t){this._imgElement.src=e,this._imgElement.alt=t,this._imgTitleElement.textContent=t}},{key:"open",value:function(e){var t=e.link,n=e.title;this._setImageData(t,n),E(S(a.prototype),"open",this).call(this)}}])&&b(t.prototype,n),a}(s);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.nameSelector,r=t.jobSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._jobElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{username:this._nameElement.textContent,job:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.username,n=e.job;this._nameElement.textContent=t,this._jobElement.textContent=n}}])&&j(t.prototype,n),e}(),O=document.querySelector(".profile__edit-button"),B=document.querySelector(".profile__add-button"),I={inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},P=new r(I,".edit-form"),q=new r(I,".add-form");P.enableValidation(),q.enableValidation();var R=new L({nameSelector:".profile__name",jobSelector:".profile__job"}),x=new v((function(e){R.setUserInfo(e),x.close()}),".popup-edit");O.addEventListener("click",(function(){x.setInputUserValues(R.getUserInfo()),x.open(),P.resetValidation()}));var T=new w(".img-popup");function V(e,n,r){return new t(e,n,r).generateCard()}function D(e){var t={link:e.target.src,title:e.target.alt};T.open(t)}var U=new v((function(e){var t=V(e,".place-blank",D);F.addItem(t,"start"),U.close()}),".popup-add");B.addEventListener("click",(function(){U.open(),q.resetValidation()}));var F=new i({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=V(e,".place-blank",D);F.addItem(t)}},".places__list");F.renderItems()})();