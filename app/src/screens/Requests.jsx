import { ActivityIndicator, FlatList, Text, View } from "react-native";
import useGlobal from "../core/global";
import Empty from "../common/Empty";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import Cell from "../common/Cell";
import Thumbnail from "../common/Thumbnail";
import { TouchableOpacity } from "react-native";
import utils from "../core/utils";

function RequestAccept({ item }) {
  const requestAccept = useGlobal((state) => state.requestAccept);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#202020",
        paddingHorizontal: 14,
        borderRadius: 18,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => requestAccept(item.sender.username)}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Accept</Text>
    </TouchableOpacity>
  );
}

function RequestRow({ item }) {
  const message = "Requested to connect with you";  

  return (
    <Cell>
      <Thumbnail url={item.sender.thumbnail} size={76} color="#20d080" />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{ fontWeight: "bold", color: "#2020202", marginBottom: 4 }}
        >
          {item.sender.name}
        </Text>
        <Text style={{ color: "#2020202" }}>
          {message}{" "}
          <Text style={{ color: "#909090", fontSize: 13 }}>{utils.formatTime(item.created)}</Text>
        </Text>
      </View>
      <RequestAccept item={item} />
    </Cell>
  );
}

function RequestsScreen() {
  const requestList = useGlobal((state) => state.requestList);

  // Show loading indicator
  if (requestList === null) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // Show empty if no items
  if (requestList.length === 0) {
    return <Empty icon={faBell} message="No requests" />;
  }

  // Show request list
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={requestList}
        renderItem={({ item }) => <RequestRow item={item} />}
        keyExtractor={(item) => item.sender.username}
      />
    </View>
  );
}

export default RequestsScreen;
