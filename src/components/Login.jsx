import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import '../blocks/Login/Login.css'

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()


  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form">
        <input
          type="email"
          id="email"
          name="email"
          className="login__email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          className="login__password"
          placeholder="Пароль"
          required
        />
        <button className="login__button-submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login