import modalUser from './render-modal-user.html?raw';
import './render-modal-user.css'
import { loadUserById } from '../../use-cases/get-user-by-id';
import { User } from '../../models/user';

/**
 * @attribute {HTMLDivElement} modal
 */
let divModal, form;
let loadUser = {};

export const showModal = async (id) => {
    divModal?.classList.remove('hide-modal');
    loadUser = {};
    if (!id) return;
    const user = await loadUserById(id);
    setFormValues(user);
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {
    form?.querySelector('[name="firstName"]').setAttribute('value', user.firstName);
    form?.querySelector('[name="lastName"]').setAttribute('value', user.lastName);
    form?.querySelector('[name="balance"]').setAttribute('value', user.balance);
    form?.querySelector('[name="isActive"]').setAttribute(user.isActive ? 'checked' : false, 'checked');
    loadUser = user;
}

const unsetFormValues = () => {
    form?.querySelector('[name="firstName"]').removeAttribute('value');
    form?.querySelector('[name="lastName"]').removeAttribute('value');
    form?.querySelector('[name="balance"]').removeAttribute('value');
    form?.querySelector('[name="isActive"]').removeAttribute('checked');
}

export const hideModal = () => {
    divModal?.classList.add('hide-modal');
    form?.reset();
    unsetFormValues();
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const RenderModalUser = (element, callback) => {

    if (divModal) return;

    divModal = document.createElement('div');
    divModal.classList.add('modal-container', 'hide-modal');

    divModal.innerHTML = modalUser;

    element.parentNode.append(divModal);

    divModal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }
    });

    form = divModal.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userLike = {...loadUser};
        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }
            if (key === 'isActive') {
                const isActive = value == 'on' ? true : false;
                userLike[key] = isActive;
                continue;
            }
            userLike[key] = value;
        }
        userLike.isActive == undefined ? userLike.isActive = false : null;
        await callback(userLike);
        hideModal();
    });
}