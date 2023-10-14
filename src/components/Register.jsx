import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../blocks/auth/auth.css"

const Register = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // }
  const navigate = useNavigate();

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form">
        <input
          type="email"
          id="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          required
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>

        <Link className="auth__link" to="/sign-in">
          Уже зарегистрованы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register;
