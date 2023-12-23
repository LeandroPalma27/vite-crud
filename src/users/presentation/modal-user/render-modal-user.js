import modalUser from './render-modal-user.html?raw';
import './render-modal-user.css'

/**
 * @attribute {HTMLDivElement} modal
 */
let divModal, form;

export const showModal = () => {
    divModal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    divModal?.classList.add('hide-modal');
    form?.reset();
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
        const userLike = {};
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