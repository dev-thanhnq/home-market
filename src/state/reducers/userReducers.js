import { UPDATE_USER } from "../actions/actionTypes";
const initialState = {
    user: {},
}
const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case (UPDATE_USER):
            return state = action.data
        default:
            return state
    }
}

export default userReducers;