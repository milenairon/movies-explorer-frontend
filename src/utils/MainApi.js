// Содержит описание запросов к Api
class MainApi {
  constructor({ url }) {
    this._url = url;
  }
  _sendRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      //если запрос ушел, но пришел ответ с ошибкой
      return Promise.reject(res); // new Error("Что-то пошло не так");//
    });
  }

  // возвращает информацию о пользователе (email и имя) '/users/me'
  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  // обновляет информацию о пользователе (email и имя) '/users/me'
  updateUserInfo({ name, email }) {
    return this._sendRequest(`${this._url}/users/me`, {
      //Метод PATCH обычно используют для обновления уже существующей инфы
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  // возвращает все сохранённые текущим пользователем фильмы '/movies'
  getSavedMovies() {
    return this._sendRequest(`${this._url}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }

  // создаёт фильм '/movies'
  addMovie(movie) {
    return this._sendRequest(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  // удаляет сохранённый фильм по id '/movies/:movieId'
  deleteMovie(movieId) {
    return this._sendRequest(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const mainApi = new MainApi({
  url: "http://localhost:3005", // "https://api.milenadiploma.nomoredomainswork.ru"
});

export default mainApi;
