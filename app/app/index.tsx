import SplashScreen from "../src/screens/Splash";
import { SafeAreaView, StatusBar, Text, View } from "react-native";


export default function Index() {
  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
    }}>
      <StatusBar barStyle='light-content' />
      <SplashScreen />
      <View>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 48
        }}>
          RealTime
        </Text>
      </View>
    </SafeAreaView>
  );
}
