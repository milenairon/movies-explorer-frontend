// РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, ПРОВЕРКА ТОКЕНА
export const BASE_URL = "https://api.milenadiploma.nomoredomainswork.ru"; // http://localhost:3005

//Зарегистрировать
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Acecpt: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else if (res.status === 400) {
        console.error("При регистрации пользователя произошла ошибка");
        return Promise.reject(res.status);
      } else if (res.status === 409) {
        console.error("Пользователь с таким email уже существует.");
        return Promise.reject(res.status);
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((res) => {
      return res;
    });
};

//Войти в систему (Авторизизировать = login)
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Acecpt: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject("Вы ввели неправильный логин или пароль.");
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((data) => {
      localStorage.setItem("jwt", data._id);
      return data._id;
    });
};

//Проверить валидность токена
export const checkValidityToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 400) {
          console.log(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        } else if (res.status === 401) {
          console.log(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        } else {
          console.log(res);
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    });
};

// ОШИБКИ ОШИБКИ ОШИБКИ
// Страница логина пользователя
// 1. Вы ввели неправильный логин или пароль.
// 2. При авторизации произошла ошибка. Токен не передан или передан не в том формате.
// 3. При авторизации произошла ошибка. Переданный токен некорректен.

// Страница регистрации пользователя
// 1. Пользователь с таким email уже существует.
// 2. При регистрации пользователя произошла ошибка.

// Страница обновления профиля
// 1. Пользователь с таким email уже существует.
// 2. При обновлении профиля произошла ошибка.

// Другое
// 1. 500 На сервере произошла ошибка.
// 2. 404 Страница по указанному маршруту не найдена.
// обновляет информацию о пользователе (email и имя) '/users/me'
