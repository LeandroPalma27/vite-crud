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
    //loadUser = {};
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
    if (user.gender === 'male') form?.querySelector('[value="male"]').setAttribute('selected', 'true');
    if (user.gender === 'female') form?.querySelector('[value="female"]').setAttribute('selected', 'true');
    loadUser = user;
}

const unsetFormValues = () => {
    form?.querySelector('[name="firstName"]').removeAttribute('value');
    form?.querySelector('[name="lastName"]').removeAttribute('value');
    form?.querySelector('[name="balance"]').removeAttribute('value');
    form?.querySelector('[name="isActive"]').removeAttribute('checked');
    form?.querySelector('[value="male"]').removeAttribute('selected');
    form?.querySelector('[value="female"]').removeAttribute('selected');
}

export const hideModal = () => {
    divModal?.classList.add('hide-modal');
    loadUser = {};
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
            userLike[key] = value;
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }
        }
        //TODO: ACTUALIZAR ACTIVO Y NO ACTIVO
        await callback(userLike);
        hideModal();
    });
}