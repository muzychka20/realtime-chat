import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Empty from "../common/Empty";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import useGlobal from "../core/global";
import Thumbnail from "../common/Thumbnail";
import Cell from "../common/Cell";


function FriendRow({ navigation, item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Messages", item);
      }}
    >
      <Cell>
        <Thumbnail url={item.friend.thumbnail} size={76} color="#20d080" />
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text
            style={{ fontWeight: "bold", color: "#2020202", marginBottom: 4 }}
          >
            {item.friend.name}
          </Text>
          <Text style={{ color: "#2020202" }}>
            {item.preview}{" "}
            <Text style={{ color: "#909090", fontSize: 13 }}>
              {utils.formatTime(item.updated)}
            </Text>
          </Text>
        </View>
      </Cell>
    </TouchableOpacity>
  );
}

function FriendsScreen({ navigation }) {
  const friendList = useGlobal((state) => state.friendList);

  // Show loading indicator
  if (friendList === null) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // Show empty if no items
  if (friendList.length === 0) {
    return <Empty icon={faInbox} message="No messages yet!" />;
  }

  // Show request list
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={friendList}
        renderItem={({ item }) => (
          <FriendRow navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default FriendsScreen;
