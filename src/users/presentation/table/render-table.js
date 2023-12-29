import usersStore from '../../store/users-store'
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../modal-user/render-modal-user';
import { RenderPaginationButtons } from '../pagination-buttons/render-pagination-buttons';
import './render-table.css'

/**
 * @type {HTMLElement}
 */
let table;

const createTable = () => {
    const table = document.createElement('table');
    table.id = 'users-table'
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Gender</th>
            <th>Balance</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `
    const tableBody = document.createElement('tbody');
    table.append(tableHeader, tableBody);
    return table;
}

/**
 * @param {HTMLDivElement}
 */
export const RenderTable = (element) => {
    const users = usersStore.getUsers();
    if (!table) {
        table = createTable();
        element.append(table);
    }

    let tableHtml = '';
    users.forEach(user => {
        tableHtml += `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.gender}</td>
                <td>${user.balance}</td>
                <td class="td-active">${user.isActive ? '<span class="user-active"><i class="fa-solid fa-circle-check"></i></span>' : '<span class="user-not-active"><i class="fa-solid fa-circle-xmark"></i></span>'}</td>
                <td><button type="button" class="btn btn-primary">Detail</button> | <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `
    });

    table.lastElementChild.innerHTML = tableHtml;

    table.querySelectorAll('.btn-primary').forEach(e => e.addEventListener('click', async (event) => {
        await showModal(event.target.parentElement.parentElement.firstElementChild.textContent);
    }));

    table.querySelectorAll('.btn-danger').forEach(e => e.addEventListener('click', async (event) => {
        try {
            if (event.target.tagName === 'path') {
                await deleteUserById(event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.textContent);
            } else {
                await deleteUserById(event.target.parentElement.parentElement.firstElementChild.textContent);
            }
            await usersStore.onUserChangedOrSaved();
            const toDelete = table.parentElement.querySelector('.buttons-container');
            toDelete.remove();
            RenderTable(element);
            RenderPaginationButtons(element);
        } catch (error) {
            console.log(error)
            alert('No se pudo eliminar.');
        }
    }));
}