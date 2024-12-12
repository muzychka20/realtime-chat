import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import MessagesScreen from "../src/screens/Messages";
import SplashScreen from "../src/screens/Splash";
import SignInScreen from "../src/screens/SignIn";
import SignUpScreen from "../src/screens/SignUp";
import SearchScreen from "../src/screens/Search";
import HomeScreen from "../src/screens/Home";
import { useEffect, useLayoutEffect, useState } from "react";
import { useFonts } from "expo-font";
import useGlobal from "../src/core/global"

const Stack = createNativeStackNavigator();

export default function Index() {
  
  const [fontsLoaded] = useFonts({
    "LeckerliOne-Regular": require('../assets/fonts/LeckerliOne-Regular.ttf'),
  });

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)

  const init = useGlobal(state => state.init)

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
