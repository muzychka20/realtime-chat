import {
  SafeAreaView,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import utils from "../core/utils";
import api from "../core/api";
import useGlobal from "../../src/core/global"

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const login = useGlobal(state => state.login)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignUp() {
    // Check username
    const failUsername = !username || username.length < 5;
    if (failUsername) {
      setUsernameError("Username must be >= 5 characters");
    }

    // Check firstName
    const failFirstName = !firstName;
    if (failFirstName) {
      setFirstNameError("First Name was not provided");
    }

    // Check lastName
    const failLastName = !lastName;
    if (failLastName) {
      setLastNameError("Last Name was not provided");
    }

    // Check password1
    const failPassword1 = !password1 || password1 < 8;
    if (failPassword1) {
      setPassword1Error("Password is too short");
    }

    // Check password2
    const failPassword2 = password1 !== password2;
    if (failPassword2) {
      setPassword2Error("Passwords don't match");
    }

    // Break out of the function if there were any issues
    if (
      failUsername ||
      failFirstName ||
      failLastName ||
      failPassword1 ||
      failPassword2
    ) {
      return;
    }

    // Make signup request
    api({
      method: "POST",
      url: "/chat/signup/",
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,        
        password: password1,
      },
    })
      .then((response) => {
        utils.log("Sign up: ", response.data);
        const credentials = {
          username: username,
          password: password1,
        };
        login(credentials, response.data.user)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.config);
        }
      });

    console.log(
      "onSignUp: ",
      username,
      firstName,
      lastName,
      password1,
      password2
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behaviour="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}
          >
            <Text
              style={{
                textAlign: "center",
                marginBottom: 24,
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
            <Input
              title="Username"
              value={username}
              error={usernameError}
              setValue={setUsername}
              setError={setUsernameError}
            />
            <Input
              title="First Name"
              value={firstName}
              error={firstNameError}
              setValue={setFirstName}
              setError={setFirstNameError}
            />
            <Input
              title="Last Name"
              value={lastName}
              error={lastNameError}
              setValue={setLastName}
              setError={setLastNameError}
            />
            <Input
              title="Password"
              value={password1}
              error={password1Error}
              setValue={setPassword1}
              setError={setPassword1Error}
              secureTextEntry={true}
            />
            <Input
              title="Retype Password"
              value={password2}
              error={password2Error}
              setValue={setPassword2}
              setError={setPassword2Error}
              secureTextEntry={true}
            />
            <Button title="Sign Up" onPress={onSignUp} />
            <Text
              style={{ textAlign: "center", marginTop: 40 }}
              onPress={() => navigation.navigate("SignIn")}
            >
              Already have an account?{" "}
              <Text style={{ color: "blue" }}>Sign In</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUpScreen;
