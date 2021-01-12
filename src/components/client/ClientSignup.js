import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { addUser } from '../../actions/index';
import {FormDiv} from "../styles/FormDiv";
import {SignupButton} from "../styles/SignupButton";
import {SignupContainer} from "../styles/SignupContainer";
import { Input } from "../styles/Input";

const ClientSignup = props => {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState(
        {
            username: "",
            password: ""
        });

    const errorInfo =
    {
        username: [],
        password: []
    };

    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    function handleSignup(event) {

        event.preventDefault();

        const criteria = {
            username: [
                [/^[\w]+$/, "Username must only contain alphanumeric characters."],
                [/.{2,}/, "Username must be longer than 2 letters."]
            ],
            password: [
                [/(?=[0-9])/, "Password must contain a digit."],
                [/(?=[a-z])/, "Password must contain a lowercase letter."],
                [/(?=[A-Z])/, "Password must contain an uppercase letter."],
                [/(?=[^0-9a-zA-Z])/, "Password must contain non-alphanumeric characters."],
                [/.{6,}/, "Password must be at least 6 characters."]
            ]
        }

        let inputsHaveErrors = false;

        function findErrors(category) {

            let errorsFound = criteria[category].filter(errorType => !userInfo[category].match(errorType[0])).map(errorType => errorType[1]);

            if (errorsFound.length > 0)
                { inputsHaveErrors = true; }

            document.getElementById(category + "Errors").innerHTML = errorsFound.join("<br>");

            errorInfo[category] = errorsFound;
        }

        findErrors("username");
        findErrors("password");

        if (!inputsHaveErrors)
        {
            console.log("Attempting to connect to database...");
            console.log("Note: if username is taken, you will get a 400 response code.")

            axios.post("https://anywherefitness187.herokuapp.com/api/auth/register", { username: userInfo.username, password: userInfo.password})

                .then(response => {

                    axios.post("https://anywherefitness187.herokuapp.com/api/auth/login", { username: userInfo.username, password: userInfo.password})
                        .then(loginResponse => {
                            sessionStorage.setItem("token", loginResponse.data.token);
                            sessionStorage.setItem("roleId", 2);

                            props.addUser(loginResponse.data.id);
                            console.log(loginResponse);
                            history.push("/client/onboarding");

                        }
                        )

                    console.log("Signup status: Database accessed.");
                    console.log("Messages received from database: ", response, response);

                    // not working right now
                    if (response.message === "Username is already taken") {

                        console.log("Username is already taken", response);
                        errorInfo.signup.push("Username is already taken.")

                    }
                    else {
                       history.push("/client");

                    }

                })
                .catch(response => {

                    console.log("Couldn't access database.", response, response.message);
                    errorInfo.signup.push("Couldn't access database. Username may have been taken.")

                    console.log(errorInfo.signup);

                });
        }
    }

    return (
        <SignupContainer>

            {/* <ImageDiv></ImageDiv> */}

            <FormDiv>

                <h1>Sign up as a Client</h1>

                <form name="login" onSubmit={handleSignup}>

                    <Input name="username" type="text" placeholder="Username" value={userInfo.username} onChange={handleChange} />
                    <p className="formError" id="usernameErrors"></p>

                    <Input name="password" type="password" placeholder="Password" value={userInfo.password} onChange={handleChange} />
                    <p className="formError" id="passwordErrors"></p>

                    <SignupButton type="submit">Sign Up</SignupButton>

                    <p className="signupErrors" id="signupErrors"></p>

                </form>

            </FormDiv>
        </SignupContainer>

    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { addUser })(ClientSignup);