import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import '../pages/index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'
import Login from './Login'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import { api } from '../utils/Api'

function App() {

  const [userInfo, setUserInfo] = useState({})
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [loggedIn, setLoggedIn] = useState({})

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
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link})
    setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.handleLike(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => alert(err))
  }

  function handleUpdateUser(value) {
    api.changeUserData(value)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => alert(err))
  }

  function handleUpdateAvatar(value) {
    api.changeAvatarData(value)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => alert(err))
  }

  function handleAddPlaceSubmit(value) {
    api.createCard(value)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch((err) => alert(err))
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => alert(err))
  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'></div>
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute
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
              />}
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </BrowserRouter>
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClick}
        />
    </CurrentUserContext.Provider>    
  )
}
export default App;
