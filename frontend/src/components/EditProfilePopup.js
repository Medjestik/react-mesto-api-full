import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [errorName, setErrorName] = React.useState({});
    const [errorDescription, setErrorDescription] = React.useState({});
    const currentUser = useContext(CurrentUserContext);

    const errorForm = errorName.error || errorDescription.error;

    function handleChangeName(e) {
        setName(e.target.value);
        if (e.target.checkValidity()) {
            setErrorName({
                errorText: '',
                error: false
            });
        }
        else {
            setErrorName({
                errorText: e.target.validationMessage,
                error: true
            });
        }  
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        if (e.target.checkValidity()) {
            setErrorDescription({
                errorText: '',
                error: false
            });
        }
        else {
            setErrorDescription({
                errorText: e.target.validationMessage,
                error: true
            });
        }  
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setErrorName({
            errorText: '',
            error: false
        });
        setErrorDescription({
            errorText: '',
            error: false
        });
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            errorForm={errorForm}
            inputValues={name && description}
        >
        <label className="popup__field">
            <input 
            className={`popup__input popup__input_type_name ${errorName.error ? "popup__input_novalid" : ""}`}
            type="text" 
            id="name"
            value={name || ''}
            onChange={handleChangeName}
            name="name" 
            placeholder="Имя" 
            minLength="2" 
            maxLength="40" 
            required 
            pattern="[A-Za-zА-Яа-яЁё -]{1,}" 
            />
            <span className={`popup__input-error ${errorName.error ? "popup__input-error_active" : ""}`} id="name-error">
                {errorName.errorText}
            </span>
        </label>
        <label className="popup__field">
            <input 
            className={`popup__input popup__input_type_job ${errorDescription.error ? "popup__input_novalid" : ""}`}
            type="text" 
            id="job"
            value={description || ''}
            onChange={handleChangeDescription}
            name="job" 
            placeholder="Занятие" 
            minLength="2" 
            maxLength="200" 
            required 
            />
            <span className={`popup__input-error ${errorDescription.error ? "popup__input-error_active" : ""}`} id="job-error">
                {errorDescription.errorText}
            </span>
        </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;