import usersStore from '../../store/users-store';
import './render-pagination-buttons.css';
import {RenderTable} from '../table/render-table';
import { loadUsersByPage } from '../../use-cases/load-users-by-page';

/**
 * @param {HTMLDivElement}
 */
export const RenderPaginationButtons = async (element) => {
    // TODO: Hacer vista detalle para actualizar y eliminar (al hacer dicha accion debemos renderizar la tabla en base al estado que tenga la aplicación en ese entonces)
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >>';
    nextButton.classList.add('btn');
    nextButton.classList.add('btn-primary');

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<< Prev';
    prevButton.classList.add('btn');
    prevButton.classList.add('btn-primary');

    const currentPageSpace = document.createElement('span');
    currentPageSpace.innerHTML = usersStore.getCurrentPage(); 
    currentPageSpace.id = 'current-page'

    buttonsContainer.append(prevButton, currentPageSpace, nextButton);

    element.append(buttonsContainer)

    if (usersStore.getCurrentPage() <= 1) {
        prevButton.disabled = true;
    }

    if ((await loadUsersByPage(usersStore.getCurrentPage() + 1)).length === 0) {
        nextButton.disabled = true;
    }

    nextButton.addEventListener('click', async (target) => {
        await usersStore.loadNextPage();
        currentPageSpace.innerHTML = usersStore.getCurrentPage();
        const divButtons = nextButton.parentElement;
        divButtons.remove();
        RenderTable(element);
        RenderPaginationButtons(element);
    });

    prevButton.addEventListener('click', async (target) => {
        await usersStore.loadPreviousPage();
        currentPageSpace.innerHTML = usersStore.getCurrentPage();
        const divButtons = prevButton.parentElement;
        divButtons.remove();
        RenderTable(element);
        RenderPaginationButtons(element);
    });




}
