import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

// import {axiosWithAuth} from "../../utils/axiosWithAuth";
import { connect } from "react-redux";
import { addUser } from "../../actions/index";
import {FormDiv} from "../styles/FormDiv";

import {SignupButton} from "../styles/SignupButton";
import {SignupContainer} from "../styles/SignupContainer";
import { Input } from "../styles/Input";

const ClientLogin = props => {

    let history = useHistory();

    const [userInfo, setUserInfo] = useState(
        {
            username: "",
            password: ""
        });
   
    const errorInfo =
    {
        username: [],
        password: [],
        login: []
    };

    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    function handleLogin(event) {

        event.preventDefault();

        // make a POST request to the database
        axios
        .post("https://anywherefitness187.herokuapp.com/api/auth/login", userInfo)
            .then(response => {

                console.log("Login status: Database accessed.");
                console.log("Errors received from database: ", response);

                if (response.message === "Username is not in the system.") {

                    errorInfo.loginErrors.push("Username not found.")

                }
                else if (response.message === "Incorrect Password") {

                    errorInfo.loginErrors.push("Password is incorrect.")

                }
                else {
                    // get authentication token
                    axios
                    .post("https://anywherefitness187.herokuapp.com/api/auth/login", { username: userInfo.username, password: userInfo.password })
                        .then(loginResponse => {
                            sessionStorage.setItem("token", loginResponse.data.token);
                            console.log(sessionStorage.getItem('token'))
                            props.addUser(loginResponse.data.id);
                            sessionStorage.setItem("roleId", 2);
                            console.log(loginResponse);
                            history.push("/client");
                        })

                }

            })
            .catch(response => {

                console.log("Incorrect Username or Password: ", response);
                errorInfo.login.push("Incorrect Username or Password")
                document.getElementById("loginErrors").textContent = "Incorrect Username or Password";

            });

  }

  // format errors for display
  const formattedErrors = errorInfo.login.join("<br>");

  return (
    <SignupContainer>
      {/* <ImageDiv></ImageDiv> */}

      <FormDiv>
        <h1>Client Log in</h1>

        <form name="login" onSubmit={handleLogin}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={handleChange}
          />
          <p className="formError" id="usernameErrors"></p>

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <p className="formError" id="passwordErrors"></p>

          <SignupButton type="submit">
            Log In
          </SignupButton>
        </form>

        <p className="loginErrors" id="loginErrors">
          {formattedErrors}
        </p>
      </FormDiv>
    </SignupContainer>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { addUser })(ClientLogin);