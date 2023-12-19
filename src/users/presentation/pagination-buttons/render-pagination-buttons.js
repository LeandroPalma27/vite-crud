import usersStore from '../../store/users-store';
import './render-pagination-buttons.css';

/**
 * @param {HTMLDivElement}
 */
export const RenderPaginationButtons = (element) => {
    // TODO: MEJORAR DESIGN DE LOS BOTONES
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >>';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<< Prev';

    const currentPageSpace = document.createElement('span');
    currentPageSpace.innerHTML = usersStore.getCurrentPage(); 
    currentPageSpace.id = 'current-page'

    buttonsContainer.append(prevButton, currentPageSpace, nextButton);

    element.append(buttonsContainer)
}
