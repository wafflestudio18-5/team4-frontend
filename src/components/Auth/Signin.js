import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";

import GitHubLogin from "react-github-login";
import axios from "axios";
import { login } from "../../Api/axios";
// import * as config from "../../config";
import { Login, setUserInfo } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

import styles from "../Questions/QuestionAsk.module.scss";
import profileimage from "../../Assets/profile_image.png";

export const Signin = () => {
  const isLoggedin = useSelector((state) => state.isLoggedReducer.isloggedin);
  const dispatch = useDispatch();
  const history = useHistory();
  const token_instance = axios.create({
    baseURL: "https://github.com/",
    headers: { Accept: "application/json" },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warn, setWarn] = useState("");
  const usernameOnChange = (username) => {
    setWarn("");
    setUsername(() => username);
  };

  const passwordOnChange = (password) => {
    setWarn("");
    setPassword(password);
  };

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      const code = newUrl[1];
      onSuccess(code);
    }
  });

  const signin = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = "";
    login(username, password)
      .then((user) => {
        console.log(user);
        dispatch(setUserInfo(user));
        dispatch(Login(user.token));
        history.go(-1);
      })
      .catch((e) => {
        console.log(e);
        setWarn("Authentication failed");
      });
  };

  const goGit = () => {
    window.open(
      `https://github.com/login/oauth/authorize?scope=user&client_id=1bc89bcdb1f71159016b&redirect_uri=https://www.wafflow.com/signin/`
    );
  };

  const onSuccess = async (code) => {
    console.log(code);
    console.log(code);
    await token_instance
      .post("https://github.com/login/oauth/access_token/", {
        params: {
          //   client_username: config.GITHUB_CLIENT_USERNAME,
          //   client_secret: config.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: "https://wafflow.com",
        },
      })
      .then(async (res) => {
        const token = res.access_token.substring(0, 40);
        //redux에 토큰 저장
        console.log("github token acquired");
        await axios
          .put("https://www.wafflow.com/api/user/login/", {
            params: { github_token: token },
          })
          .then((res) => {
            console.log(res);
            alert("Login success");
            dispatch(setUserInfo(res));
            dispatch(Login({ token: res.token }));
            history.go(0);
          })
          .catch((e) => {
            console.log(e);
            setWarn("Authentication failed");
          });
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to acquire Token from Github");
      });
  };

  const onFailure = (e) => {
    console.log(e);
  };
  if (isLoggedin) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className={styles.box12}>
        <div className={styles.board_all12}>
          <div className={styles.box_top}>
            <div className={styles.box}>
              <div className={styles.top_sub1}>
                {/* <link href={`https://github.com/login/oauth/authorize?scope=user&client_id=1bc89bcdb1f71159016b&redirect_uri=https://www.wafflow.com/signin/`}>Login with Github</link> */}

                <div
                  onClick={() => {
                    goGit();
                  }}
                  className={styles.gitbtn}
                >
                  Login with Github
                </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.board}>
              <div className={styles.top}></div>
              <div className={styles.body}>
                <div className={styles.body_sub}>
                  <div className={styles.title_box}>
                    <div className={styles.top_sub}>Username</div>
                    <div className={styles.input_box}>
                      <input
                        className={styles.input_title}
                        value={username}
                        onChange={(e) => {
                          usernameOnChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="qask-body-box">
                    <div className={styles.top_sub}>Password</div>
                    <input
                      type="password"
                      className={styles.input_title}
                      value={password}
                      onChange={(e) => {
                        passwordOnChange(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="qask-body-left-buttonbox">
                <div
                  onClick={(e) => {
                    signin(e);
                  }}
                  className={
                    styles.btn
                  } /*TODO: Review and Post are divided in the original site*/
                >
                  Sign in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
