import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../blocks/Register/Register.css";

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
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form">
        <input
          type="email"
          id="email"
          name="email"
          className="register__email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          className="register__password"
          placeholder="Пароль"
          required
        />
        <button className="register__button-submit" type="submit">
          Зарегистрироваться
        </button>

        <Link className="register__link" to="sign-in">
          Уже зарегистрованы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register;
