import { RenderPaginationButtons } from "./presentation/pagination-buttons/render-pagination-buttons";
import { RenderTable } from "./presentation/table/render-table";
import usersStore from "./store/users-store";

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
}