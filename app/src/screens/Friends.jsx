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

function formatTime(date) {
  if (date == null) {
    return "-";
  }
  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;
  // seconds
  if (s < 60) {
    return "now";
  }
  // minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m ago`;
  }
  // hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}h ago`;
  }
  // days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}d ago`;
  }
  // weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w ago`;
  }
  // years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}y ago`;
}

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
              {formatTime(item.updated)}
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
    <View style={{ flex: 1 }}>
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
