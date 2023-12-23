import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;
    // Siempre la concatenacion va en ese orden xD
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if (state.currentPage - 1 > 0) {
        const users = await loadUsersByPage(state.currentPage - 1);
        state.currentPage -= 1;
        state.users = users;
    }
}

const onUserChangedOrSaved = async () => {
    const users = await loadUsersByPage(state.currentPage);
    state.users = users;
}

const reloadPage = async () => {
    throw new Error('No esta implementado.');
}

const getUsers = () => {
    return [...state.users];
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChangedOrSaved,
    reloadPage,
    getUsers,
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}