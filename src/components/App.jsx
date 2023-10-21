import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import "../pages/index.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup"
import AddPlacePopup from "./AddPlacePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import InfoTooltip from "./InfoTooltip"
import ProtectedRoute from "./ProtectedRoute"
import Register from "./Register"
import Login from "./Login"
import * as auth from "../utils/auth"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

import { api } from "../utils/Api"

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isPreloading, setIsPreloading] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [infoTooltipTitle, setInfoTooltipTitle] = ""
  const [infoTooltipIcon, setInfoTooltipIcon] = ""

  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch((err) => alert(err))
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
    setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .handleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => alert(err))
  }

  function handleUpdateUser(value) {
    setIsPreloading(true)
    api
      .changeUserData(value)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleUpdateAvatar(value) {
    setIsPreloading(true)
    api
      .changeAvatarData(value)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleAddPlaceSubmit(value) {
    setIsPreloading(true)
    api
      .createCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => alert(err))
  }

  const handleTooltipClick = () => {
    setInfoTooltipTitle("Вы успешно зарегистрировались!")
    setInfoTooltipIcon("succes")
    setIsInfoTooltipPopupOpen(true)
  }
  const handleTooltipErrorClick = () => {
    setInfoTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.")
    setInfoTooltipIcon("error")
    setIsInfoTooltipPopupOpen(true)
  }

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true })
        handleTooltipClick()
      })
      .catch((err) => {
        handleTooltipErrorClick()
        alert(err)
      })
  }

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        setLoggedIn(true)
        setEmail(res.data.email)
        navigate("/")
      })
    }
  }

  const signOut = () => {
    localStorage.removeItem("jwt")
    setLoggedIn(false)
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page"></div>
      <Header email={email} loggedIn={loggedIn} signOut={signOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              userName={userInfo.name}
              userAbout={userInfo.about}
              userAvatar={userInfo.avatar}
              cards={cards}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register />}
          handleRegister={handleRegister}
        />
        <Route path="/sign-in" element={<Login />} handleLogin={handleLogin} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
          handleLogin={handleLogin}
        />
      </Routes>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleOverlayClick}
        onUpdateUser={handleUpdateUser}
        isPreloading={isPreloading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleOverlayClick}
        onAddPlace={handleAddPlaceSubmit}
        isPreloading={isPreloading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleOverlayClick}
        onUpdateAvatar={handleUpdateAvatar}
        isPreloading={isPreloading}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleOverlayClick}
      />
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleOverlayClick}
        title={infoTooltipTitle}
        icon={infoTooltipIcon}
      />
    </CurrentUserContext.Provider>
  )
}
export default App
