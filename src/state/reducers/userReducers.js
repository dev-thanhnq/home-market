import { UPDATE_USER } from "../actions/actionTypes";
let token = ''
const userReducers = (state = token, action) => {
    switch (action.type) {
        case (UPDATE_USER):
            state = action.data
            return state
        default:
            return state
    }
}

export default userReducers;