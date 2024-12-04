import { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Title from "../common/Title";
import Input from "../common/Input";
import Button from "../common/Button";

function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignIn() {
    console.log("onSignIn: ", username, password);

    // Check usernmae
    const failUsername = !username
    if (failUsername) {
      setUsernameError('Username is not provided')
    }

    // Check password
    const failPassword = !password
    if (failPassword) {
      setPasswordError('Password is not provided')
    }

    // Break out of this this function if there were any issues
    if (failPassword || failUsername) {
      return
    }

    // Make  sigin request

    //...
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Title text="chat" color="#202020" />
        <Input
          title="Username"
          value={username}
          error={usernameError}
          setValue={setUsername}
          setError={setUsernameError}
        />
        <Input
          title="Password"
          value={password}
          error={passwordError}
          setValue={setPassword}
          setError={setPasswordError}
        />
        <Button title="Sign In" onPress={onSignIn} />
        <Text
          style={{ textAlign: "center", marginTop: 40 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? <Text style={{ color: "blue" }}>Sign Up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignInScreen;
