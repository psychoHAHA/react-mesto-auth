import React from "react";
import okIcon from "../images/ok.svg"
import errorIcon from "../images/error.svg"

function InfoTooltip ({ isOpen, onClose, onCloseOverlay, title, tooltipIcon }) {
  return (
    <aside className={`popup popup-tooltip  ${isOpen ? "popup_opened" : ""}` } onClick={onCloseOverlay}>
          <div className="popup-tooltip__content" onClick={event => event.stopPropagation()}>
              <button type="button" aria-label="Закрыть" className="popup__button-close" onClick={onClose}></button>
              <div className="popup-tooltip__icon">
                {tooltipIcon === 'succes' && (
                  <img src={okIcon} alt='Вы успешно зарегистрировались' />
                )}
                {tooltipIcon === "error" && (
                  <img src={errorIcon} alt="Вам не удалось зарегистрироваться" />
                )}
              </div>
              <h2 className="popup-tooltip__title">{title}</h2>
          </div>
      </aside>  
  )
}