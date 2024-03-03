// Попап с открывающимся меню-навигацией при ширине экрана < 768px

import React from "react";
import Popup from "../Popup/Popup";

export default function PopupMenu({ onClose, isOpen }) {
  return (
    <>
      <Popup name="popup-menu" onClose={onClose} isOpen={isOpen} />
    </>
  );
}
