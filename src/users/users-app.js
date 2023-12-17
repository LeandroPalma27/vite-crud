import usersStore from "./store/users-store";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {
    element.innerHTML = 'Loading...';
    const users = await usersStore.loadNextPage();
    console.log(users)
}