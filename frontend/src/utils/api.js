const baseUrl = 'https://www.medjestik.mesto.students.nomoreparties.xyz';

function handleResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
}

const register = ({ email, password }) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => handleResponse(res));
};

const login = ({ email, password  }) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => handleResponse(res));
};

const getUser = ({ token }) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => handleResponse(res));
}

const getInitialCards = ({ token }) => {
    return fetch(`${baseUrl}/cards`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => handleResponse(res));
}

const editUserInfo = ({ token, name, about }) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => handleResponse(res));
}

const changeAvatar = ({ token, avatar }) => {
    return fetch(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ avatar })
    })
    .then(res => handleResponse(res));
}

const addCard = ({ token, name, link }) => {
    return fetch(`${baseUrl}/cards`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            link: link
            })
    })
    .then(res => handleResponse(res));
}

const deleteCard = ({ token, id }) => {
    return fetch(`${baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => handleResponse(res));
}

const putLike = ({ token, id }) => {
    return fetch(`${baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => handleResponse(res));
}

const removeLike = ({ token, id }) => {
    return fetch(`${baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => handleResponse(res));
}

export default {
    register,
    login,
    getUser,
    getInitialCards,
    editUserInfo,
    changeAvatar,
    addCard,
    deleteCard,
    putLike,
    removeLike
}
