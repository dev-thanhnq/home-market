import { UPDATE_USER } from "./actionTypes";

export const updateUser = (data) => {
    return {
        data : data,
        type: UPDATE_USER
    }
}