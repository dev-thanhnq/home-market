import { UPDATE_USER } from "../actions/actionTypes";
const token = ''
const userReducers = (state = token, action) => {
    switch (action.type) {
        case (UPDATE_USER):
            console.log('token', action.data)
            return state = action.data
        default:
            console.log()
            return state
    }
}

export default userReducers;