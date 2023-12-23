import { User } from "../models/user";

/**
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = (user) => {
    const {
        avatar,
        balance,
        firstName,
        lastName,
        gender,
        id,
        isActive
    } = user;
    return {
        avatar,
        balance,
        first_name: firstName,
        last_name: lastName,
        gender,
        id,
        isActive
    }
}