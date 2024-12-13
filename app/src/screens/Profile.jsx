import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import useGlobal from "../core/global";

import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import utils from "../core/utils";

function ProfileImage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    utils.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={{ marginBottom: 20 }} onPress={pickImage}>
      <Image
        source={image ? { uri: image } : require("../assets/profile.jpg")}
        style={{ width: 180, height: 180, borderRadius: 90 }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: "#202020",
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 3,
          borderColor: "white",
        }}
      >
        <FontAwesomeIcon icon={faPencil} size={15} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}

function ProfileLogout() {
  const logout = useGlobal((state) => state.logout);
  return (
    <TouchableOpacity
      onPress={logout}
      style={{
        flexDirection: "row",
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 26,
        backgroundColor: "#202020",
        marginTop: 40,
      }}
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
        size={20}
        color="#d0d0d0"
        style={{ marginRight: 12 }}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: "#d0d0d0",
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}

function ProfileScreen() {
  const user = useGlobal((state) => state.user);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <ProfileImage />
      <Text
        style={{
          textAlign: "center",
          color: "#303030",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 6,
        }}
      >
        {user.name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#606060",
          fontSize: 14,
        }}
      >
        @{user.username}
      </Text>
      <ProfileLogout></ProfileLogout>
    </View>
  );
}

export default ProfileScreen;
