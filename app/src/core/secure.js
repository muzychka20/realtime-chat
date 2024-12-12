import AsyncStorage from "@react-native-async-storage/async-storage";

const set = async (key, object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(object));
  } catch (error) {
    console.log("secure.set:", error);
  }
};

const get = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("secure.get:", error);
  }
};

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("secure.remove:", error);
  }
};

const wipe = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("secure.remove:", error);
  }
};

export default secure = { set, get, remove, wipe };
