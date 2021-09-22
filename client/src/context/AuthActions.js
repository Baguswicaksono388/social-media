export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (users) => ({
    type: "LOGIN_SUCCESS",
    payload: users
});

export const Loginfailure = () => ({
    type: "LOGIN_FAILURE",
    // payload: error
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
});