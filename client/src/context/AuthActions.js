export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (users) => ({
    type: "LOGIN_SUCCESS",
    payload: users
});

export const Loginfailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});