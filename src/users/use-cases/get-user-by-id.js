import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User>} user
 */
export const loadUserById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`
    const res = await fetch(url);
    const data = await res.json();
    const user = localhostUserToModel(data);
    return user;
}