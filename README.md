# Проект: "Фильмы" (frontend)

---

<div align="center">
<img src='/src/images/Обзор многостраничного сайта.gif' alt='обзор проекта'>
</div>

---

## Оглавление

1. Описание и функционал;
2. Как запустить проект
3. Ссылки и важная информаци о проекте;
4. Технологии, используемые в проекте.
5. Планы по улучшению

---

## 1. Описание и функционал

Дипломный проект, включает фронтенд- и бэкенд-части приложения со следующими возможностями:

1. Для пользователей: авторизации, аутификация, регистрации и возможноть изменения данных текущего пользователяю. Все данные валидируются.
2. Для фильмов: получение фильмов со стороннего сайта, возможность добавления, удаления их из сохраненных фильмов, переход на ютубу для просмотра трейлера.
3. Основная страница: просмотр информации о данном проекте, о изученных технологиях во время обучения, обо мне и ссылками на репозитории прошлых работ.

_Проект написан на библиблиотеке React и JavaScript._

#### Дипломный проект включал 5 этапов:

1. составление плана,
2. работу над бэкендом,
3. работу над вёрсткой,
4. добавление функциональности о фронтенд-часть,
5. финальные доработки.

#### Дипломный проект был написан за 5 недель.

У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.

---

## 2. Как запустить проект

1. Скачайте из репозитория https://github.com/milenairon/movies-explorer-frontend и https://github.com/milenairon/movies-explorer-api папки, нажав на кнопку Code → Download ZIP
2. Извлеките данные из папки.
3. Скачайте Node.js
4. '''npm ci''' - установить зависимости
5. Войдите через командную строку Node.js в папку movies-explorer-frontend. Введите '''npm run start''' (в браузере откроется front-end часть)
6. Войдите через командную строку Node.js в папку movies-explorer-api. Введите '''npm run dev''' (в браузере откроется back-end часть)

---

## 3. Ссылки и важная информаци о проекте

Ссылка на макет: https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/Дипломный-проект?type=design&node-id=1-7266&mode=design&t=lWxbFcbxWZWgQe5F-0<br>
Название макета: dark-2 <br>

Ссылка на front-end репозиторий: https://github.com/milenairon/movies-explorer-frontend <br>
Ссылка на back-end репозиторий: https://github.com/milenairon/movies-explorer-api

---

## 4. Технологии

 <ul className="techs__items">
        <li className="techs__item">
          <p className="techs__tech">HTML</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">CSS</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">JS</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">React</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">React Router</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">Git</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">Express.js</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">mongoDB</p>
        </li>
 </ul>

---

## 5. Планы по улучшению

1. Добавить кнопку показа информации о фильме: страна, режисер и т.д.
2. Добавить другие фильтры по карточкам фильмов: по стране, режисеру, описанию.
3. Добавить кнопку с функцией "Не показывать этот фильм", страницу с заблокированными фильмами
4. Кроссбраузерность
