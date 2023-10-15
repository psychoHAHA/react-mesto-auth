import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <img src={require('../images/logo.svg').default} alt="лого замечательного сайта под названием Mesto, который я начинаю верстать 07.06.2023 в 17:01 по Екатеринбугскому времени. Делаю я это, совершенно не зная, как в дальнейшем мне предстоит писать JavaScript к этому проекту." className="header__logo" />
      <BrowserRouter>
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </BrowserRouter>
    </header>
  )
}