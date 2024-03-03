export const BASE_URL = "http://localhost:3000"; // "https://api.milenadiploma.nomoredomainswork.ru"

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
      console.log(0);
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else if (res.status === 400) {
        console.log("При регистрации пользователя произошла ошибка");
        return Promise.reject(res.status);
      } else if (res.status === 409) {
        console.log("Пользователь с таким email уже существует.");
        return Promise.reject(res.status);
      } else {
        console.log(3);
        return Promise.reject(res.status);
      }
    })
    .then((res) => {
      return res;
    });
};

// //Войти в систему (Авторизизировать = login)
// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Acecpt: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else if (res.status === 400) {
//         console.log("Некорректно заполнено одно из полей");
//       } else if (res.status === 401) {
//         console.log("Пользователь с email не найден");
//       } else {
//         console.log(res);
//       }
//     })
//     .then((data) => {
//       localStorage.setItem("jwt", data._id);
//       return data._id;
//     });
// };


// //Проверить валидность токена
// export const checkValidityToken = (jwt) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${jwt}`,
//     },
//   })
//     .then((res) => {
//       try {
//         if (res.status === 200) {
//           return res.json();
//         } else if (res.status === 400) {
//           console.log("Токен не передан или передан не в том формате");
//         } else if (res.status === 401) {
//           console.log("Переданный токен некорректен");
//         } else {
//           console.log(res);
//         }
//       } catch (e) {
//         return e;
//       }
//     })
//     .then((res) => {
//       return res;
//     });
// };