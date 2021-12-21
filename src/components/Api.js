export default class Api {
  constructor({ serverUrl, token, groupId }) {
    this._serverUrl = serverUrl;
    this._token = token;
    this._groupId = groupId;
  }

  _checkResult(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} `);
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/${this._groupId}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._checkResult);
  }

  postNewCard({ name, link }) {
    return fetch(`${this._serverUrl}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResult)
  }

  likeCard(id) { //мб изменить на this._id и использовать bind
    return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      },
    })
      .then(this._checkResult)
  }

  dislikeCard(id) {
    return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(this._checkResult)
  }

  deleteCardFromServer(id) {
    return fetch(`${this._serverUrl}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(this._checkResult)
  }

  getUserInfo() {
    return fetch(`${this._serverUrl}/${this._groupId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResult)
  }

  postUserInfo({ username, job }) {
    return fetch(`${this._serverUrl}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        about: job,
      })
    })
      .then(this._checkResult)
  }

  updateAvatar(link) {
    return fetch(`${this._serverUrl}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResult)
  }
}