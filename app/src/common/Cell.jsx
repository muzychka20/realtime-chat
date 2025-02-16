import { View } from "react-native";

function Cell({ children }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c7c7",
        height: 106,
      }}
    >
      {children}
    </View>
  );
}

export default Cell;
