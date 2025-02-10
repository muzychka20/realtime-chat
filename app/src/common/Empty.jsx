import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function Empty({ icon, message, centered }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContentCenter: centered ? "center" : "flex-start",
        alignItems: "center",
        paddingVertical: 120,
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        color="#c3c3c3"
        size={90}
        style={{
          marginBottom: 16,
        }}
      />
      <Text style={{ color: "#c3c3c3", fontSize: 16 }}>{message}</Text>
    </View>
  );
}

export default Empty;
