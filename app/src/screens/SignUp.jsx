import { SafeAreaView, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

function SignUpScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Input title="Username" />
        <Input title="First Name" />
        <Input title="Last Name" />
        <Input title="Password" />
        <Input title="Retype Password" />
        <Button title="Sign In" />
        <Text
          style={{ textAlign: "center", marginTop: 40 }}
          onPress={() => navigation.navigate("SignIn")}
        >
          Already have an account? <Text style={{ color: "blue" }}>Sign In</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;
