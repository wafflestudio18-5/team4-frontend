export const Login = (token: string) => {
  return {
    type: "LOGIN",
    token,
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};

//User info 관련 Actions
export const setUserInfo = (user: any) => {
  return {
    type: "SET_USER_INFO",
    user,
  };
};

export const removeUserInfo = () => {
  return {
    type: "REMOVE_USER_INFO",
  };
};
