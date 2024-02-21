import React from "react";
import "../src/components/Page/Page.css";
// BrowserRouter отслеживает историю навигации в процессе работы React Router
import { BrowserRouter } from "react-router-dom";
// ReactDOM - функция, которая вставляет на страницу сформированную древовидную структуру объектов
import ReactDOM from "react-dom/client";
import "./pages/index.css";
import App from "./components/App/App.jsx";
import reportWebVitals from "./reportWebVitals";

// createRoot позволяет создать root для отображения компонентов React внутри DOM-узла браузера
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode> позволяет находить распространенные ошибки в ваших компонентах на ранних стадиях разработки
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
