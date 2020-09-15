import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function TopicDetailScreen({ route, navigation }) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        <Button
          title="Back to Topics"
          onPress={() => navigation.push("Topics")}
        />
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
