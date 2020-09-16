import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../store/topicDetails/actions";
import { selectTopicDetails } from "../store/topicDetails/selectors";
export default function TopicDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const topic = useSelector(selectTopicDetails);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  return (
    <View style={styles.container}>
      <Text>🚀 {topic.name}</Text>
      <Text> {topic.description}</Text>
      <Button
        title="Back to Topics"
        onPress={() => navigation.push("Topics")}
      />
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
