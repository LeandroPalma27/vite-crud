import { RenderModalUser } from "./presentation/modal-user/render-modal-user";
import { RenderPaginationButtons } from "./presentation/pagination-buttons/render-pagination-buttons";
import { RenderShowModalButton } from "./presentation/show-modal-button/render-show-modal-button";
import { RenderTable } from "./presentation/table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {
    element.innerHTML = 'Loading...';
    await usersStore.loadNextPage();
    element.innerHTML = '';
    RenderTable(element);
    RenderPaginationButtons(element);
    RenderShowModalButton(element);
    RenderModalUser(element, async (userLike) => {
        await saveUser(userLike);
        await usersStore.onUserChangedOrSaved();
        const toDelete = element.querySelector('.buttons-container');
        toDelete.remove();
        RenderTable(element);
        RenderPaginationButtons(element);
    });
}