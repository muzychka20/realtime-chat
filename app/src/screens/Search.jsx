import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import Empty from "../common/Empty";
import Cell from "../common/Cell";
import Thumbnail from "../common/Thumbnail";
import useGlobal from "../core/global";

function SearchButton({ user }) {
  // Add tick if user is already connected
  if (user.status == "connected") {
    return (
      <FontAwesomeIcon
        icon={faCircleCheck}
        size={30}
        color="#20d080"
        style={{
          marginRight: 10,
        }}
      />
    );
  }

  const requestConnect = useGlobal((state) => state.requestConnect);

  const data = {};

  switch (user.status) {
    case "no-connection":
      data.text = "Connect";
      data.disabled = false;
      data.onPress = () => requestConnect(user.username);
      break;

    case "pending-them":
      data.text = "Pending";
      data.disabled = true;
      data.onPress = () => {};
      break;

    case "pending-me":
      data.text = "Accept";
      data.disabled = false;
      data.onPress = () => {};
      break;

    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.disabled ? "#505055" : "#202020",
        paddingHorizontal: 14,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
      }}
      disabled={data.disabled}
      onPress={data.onPress}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: data.disabled ? "#808080" : "white",
        }}
      >
        {data.text}
      </Text>
    </TouchableOpacity>
  );
}

function SearchRow({ user }) {
  return (
    <Cell>
      <Thumbnail url={user.thumbnail} size={76} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{ fontWeight: "bold", color: "#2020202", marginBottom: 4 }}
        >
          {user.name}
        </Text>
        <Text style={{ color: "#2020202" }}>{user.username}</Text>
      </View>
      <SearchButton user={user} />
    </Cell>
  );
}

function SearchScreen() {
  const [query, setQuery] = useState("");

  const searchList = useGlobal((state) => state.searchList);
  const searchUsers = useGlobal((state) => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  /*
  const searchList = [
    {
      thumbnail: null,
      name: "namea",
      username: "sura",
      status: "connected",
    },
    {
      thumbnail: null,
      name: "nameb",
      username: "surb",
      status: "no-connection",
    },
    {
      thumbnail: null,
      name: "namec",
      username: "surc",
      status: "pending-them",
    },
    {
      thumbnail: null,
      name: "named",
      username: "surd",
      status: "pending-me",
    },
  ];
  */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "#c7c7c7",
        }}
      >
        <View>
          <TextInput
            style={{
              backgroundColor: "#e1e2e4",
              height: 52,
              borderRadius: 26,
              padding: 16,
              fontSize: 16,
              paddingLeft: 50,
            }}
            value={query}
            onChangeText={setQuery}
            placeholder="Search..."
            placeholderTextColor="#b0b0b0"
          />
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color="#505050"
            style={{
              position: "absolute",
              left: 18,
              top: 17,
            }}
          ></FontAwesomeIcon>
        </View>
      </View>
      {searchList === null ? (
        <Empty
          icon={faMagnifyingGlass}
          message={"Search for friends"}
          centered={false}
        />
      ) : searchList.length === 0 ? (
        <Empty
          icon={faTriangleExclamation}
          message={'No users found for "' + query + '"'}
          centered={false}
        />
      ) : (
        <FlatList
          data={searchList}
          renderItem={({ item }) => <SearchRow user={item} />}
          keyExtractor={(item) => item.username}
        />
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
