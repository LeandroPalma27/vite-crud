const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    throw new Error('No esta implementado.');
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