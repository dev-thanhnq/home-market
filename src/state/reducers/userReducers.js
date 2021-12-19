import { UPDATE_USER } from "../actions/actionTypes";
const token = ''
const userReducers = (state = token, action) => {
    switch (action.type) {
        case (UPDATE_USER):
            return state = action.data
        default:
            return state
    }
}

export default userReducers;