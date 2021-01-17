const defaultUser = {
  user: {
    id: "",
    username: "",
    token: "",
    created_at: "",
    updated_at: "",
    email: "",
    last_login: "",
    nickname: "",
    picture: "",
    reputation: 0,
    title: "",
    intro: "",
    question_count: 0,
    answer_count: 0,
    bookmark_count: 0,
  },
};

export const userInfoReducer = (state = defaultUser, action: any) => {
  switch (action.type) {
    case "SET_USER_INFO":
      console.log("setting user info");
      console.log(action);
      localStorage.setItem("token", action.user.token);

      return action;

    case "REMOVE_USER_INFO":
      console.log("remove user info");
      return defaultUser;
    default:
      return state;
  }
};

export const isLoggedReducer = (
  state = { loggedin: false, token: null },
  action: any
) => {
  switch (action.type) {
    case "LOGIN":
      console.log("login token");
      console.log(action);
      return { loggedin: true, token: action.token };
    case "LOGOUT":
      console.log("logout!");
      return { loggedin: false, token: null };
    default:
      return state;
  }
};
