import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import '../blocks/auth/auth.css'

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()


  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login