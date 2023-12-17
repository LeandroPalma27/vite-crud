import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
   const users = await loadUsersByPage(++state.currentPage);
   return users;
}

const loadPreviousPage = async () => {
    throw new Error('No esta implementado.');
}

const onUserChanged = () => {
    throw new Error('No esta implementado.');

}

const reloadPage = async () => {
    throw new Error('No esta implementado.');



}

export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}