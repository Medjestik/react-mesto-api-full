import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: linkRef.current.value,
        });
        linkRef.current.value = '';
    }
    
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="change-avatar"
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            inputValues={true}
            >
            <label className="popup__field">
                <input 
                className="popup__input popup__input_type_avatar" 
                type="url"
                id="avatar"
                ref={linkRef}
                name="avatar" 
                placeholder="Ссылка на картинку" 
                required 
                />
                <span className="popup__input-error" id="link-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;