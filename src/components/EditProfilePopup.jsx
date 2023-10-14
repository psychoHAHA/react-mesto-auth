import React, { useEffect, useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup({
  isOpen,
  onClose,
  onCloseOverlay,
  onUpdateUser
}) {

  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({name, about: description})
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      title='Редактирование профиля'
      buttonText='Сохранить'
      onSubmit={handleSubmit}>
      
      <input 
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_edit_profile-name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        id="name-input"
        onChange={(event) => setName(event.target.value)}
        value={name ?? ''}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_edit_profile-info"
        name="about"
        required
        minLength="2"
        maxLength="200"
        id="info-input"
        value={description ?? ''}
      />
      <span className="popup__input-error info-input-error"></span>

    </PopupWithForm>
  )
}

export default EditProfilePopup