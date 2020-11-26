import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [errorName, setErrorName] = React.useState({});
    const [errorLink, setErrorLink] = React.useState({});

    const errorForm = errorName.error || errorLink.error;

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

    function handleChangeLink(e) {
        setLink(e.target.value);
        if (e.target.checkValidity()) {
            setErrorLink({
                errorText: '',
                error: false
            });
        }
        else {
            setErrorLink({
                errorText: e.target.validationMessage,
                error: true
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
        setErrorName({
            errorText: '',
            error: false
        });
        setErrorLink({
            errorText: '',
            error: false
        });
    }, [isOpen]);

    

    return (
        <PopupWithForm
            title="Новое место"
            name="cards"
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            errorForm={errorForm}
            inputValues={name && link}
            >
            <label className="popup__field">
                <input
                className={`popup__input popup__input_type_title ${errorName.error ? "popup__input_novalid" : ""}`}
                type="text"
                id="title"
                name="name"
                value={name || ''}
                onChange={handleChangeName}
                placeholder="Название"
                minLength="1"
                maxLength="30"
                required
                />
                <span className={`popup__input-error ${errorName.error ? "popup__input-error_active" : ""}`} id="title-error">
                    {errorName.errorText}
                </span>
            </label>
            <label className="popup__field">
                <input 
                className={`popup__input popup__input_type_link ${errorLink.error ? "popup__input_novalid" : ""}`}
                type="url" id="link" 
                name="link"
                value={link || ''}
                onChange={handleChangeLink}
                placeholder="Ссылка на картинку" 
                required />
                <span className={`popup__input-error ${errorLink.error ? "popup__input-error_active" : ""}`} id="link-error">
                    {errorLink.errorText}
                </span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;