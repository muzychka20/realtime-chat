import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { View } from "react-native";
import Title from "../common/Title";

function Input({ title }) {
  return (
    <View>
      <Text style={{ color: "#70747a", marginVertical: 6, paddingLeft: 16 }}>
        {title}
      </Text>
      <TextInput
        style={{
          backgroundColor: "#e1e2e4",
          borderRadius: 26,
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
}

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
          alignItems: "center",
          paddingHorizontal: 20,
          alignSelf: "stretch",
        }}
      >
        <Title text="chat" color="#202020" />

        <Input title="Username" />
        <Input title="Password" />
      </View>
    </SafeAreaView>
  );
}

export default SignInScreen;
