class Api{
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    _checkingInfo(res) {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(console.log(`Ошибка: код ${res.status}`))
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkingInfo)
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkingInfo)
    }

    updateProfile(userData) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
            .then(this._checkingInfo)
    }

    getAvatarInfo(avatarData) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatarData)
        })
            .then(this._checkingInfo)
    }

    createNewCard(cardData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData)
        })
            .then(this._checkingInfo)
    }

    addLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkingInfo)
    }

    removeLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkingInfo)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkingInfo)
    }
}

export default new Api ({
    url: `https://mesto.nomoreparties.co/v1/cohort-50/`,
    headers: {
        authorization: '81329a12-6862-4862-a5bb-784002a24ef0',
        'Content-Type': 'application/json'
    }
})