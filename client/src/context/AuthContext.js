import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    users: {
    "_id": "613ef16f5f1d133ba26fe730",
    "username": "ahmad",
    "email": "ahmad@gmail.com",
    "profilePicture": "",
    "coverPicture": "",
    "followers": [
        "613ef0d4fb1ef12ec5bac3a8"
    ],
    "followings": [
        "613ef0d4fb1ef12ec5bac3a8"
    ],
    "isAdmin": false,
    "createdAt": "2021-09-13T06:36:31.313Z",
    "updatedAt": "2021-09-14T02:37:01.037Z",
    "__v": 0
},
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                users: state.users,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}