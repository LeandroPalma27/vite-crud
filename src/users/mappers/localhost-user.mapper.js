import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localhostUserToModel = (localhostUser) => {
    const {
        avatar,
        balance,
        first_name,
        last_name,
        gender,
        id,
        isActive,
    } = localhostUser;
    return new User({
        avatar,
        balance,
        firstName: first_name,
        lastName: last_name,
        gender,
        id,
        isActive
    });
}