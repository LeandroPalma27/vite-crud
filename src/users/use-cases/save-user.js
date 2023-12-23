import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
    
    const user = new User(userLike);

    const userToSave = userModelToLocalhost(user);

    if (userToSave.id) {
        throw 'No esta implementada la actualizacion.'
        return;
    }

    const res = await createUser(userToSave);

    return res;
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const newUser = await res.json();

    return newUser;
}