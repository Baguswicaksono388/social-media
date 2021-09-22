const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                users: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                users: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                users: null,
                isFetching: false,
                error: true
            };
        case "FOLLOW":
            return {
                ...state,
                users: {
                    ...state.users,
                    followings: [...state.users.followings, action.payload]
                }
            };
         case "UNFOLLOW":
            return {
                ...state,
                users: {
                    ...state.users,
                    followings: state.users.followings.filter(following=> following !==action.payload)
                }
            };
        default:
            return state
    }
}

export default AuthReducer;