import './render-show-modal-button.css'
/**
 * @param {HTMLDivElement}
 */
export const RenderShowModalButton = (element) => {
    const divButton = document.createElement('div');
    divButton.classList.add('container_fab-button');
    const faButton = document.createElement('button');
    faButton.innerHTML = '+'
    faButton.classList.add('fab-button');

    divButton.append(faButton);
    
    element.parentNode.append(divButton);

    faButton.addEventListener('click', () => {
        throw new Error('no esta implementado.');
    });
}