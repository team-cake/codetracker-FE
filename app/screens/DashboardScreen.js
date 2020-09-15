import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

export default function DashboardScreen() {
  const user = useSelector(selectUser);
  console.log("DashboardScreen -> user", user);
  return (
    <View style={styles.container}>
      <Text>
        Welcome back {user.name} {user.surname} from class {user.class}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
