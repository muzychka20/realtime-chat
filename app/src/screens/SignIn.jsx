import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Title from "../common/Title";
import Input from "../common/Input";
import Button from "../common/Button";

function SignInScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
        <Input title="Username" />
        <Input title="Password" />
        <Button title="Sign In" />
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
