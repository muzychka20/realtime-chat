import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import RequestsScreen from "./Requests";
import FriendsScreen from "./Friends";
import ProfileScreen from "./Profile";
import useGlobal from "../../src/core/global";
import Thumbnail from "../common/Thumbnail";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const socketConnect = useGlobal((state) => state.socketConnect);
  const socketClose = useGlobal((state) => state.socketClose);
  const user = useGlobal((state) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);

  function onSearch() {
    navigation.navigate("Search");
  }

  return (
    <Tab.Navigator
      // set icons in the tabs
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Thumbnail url={user.thumbnail} size={28} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSearch}>
            <FontAwesomeIcon
              style={{ marginRight: 16 }}
              icon={faSearch}
              color="#404040"
              size={22}
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Requests: faBell,
            Friends: faInbox,
            Profile: faUser,
          };

          const icon = icons[route.name];
          return <FontAwesomeIcon icon={icon} color={color} size={28} />;
        },
        tabBarActiveTintColor: "#202020",
        tabBarShowLabel: false,
        // headerShown: false
      })}
    >
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
